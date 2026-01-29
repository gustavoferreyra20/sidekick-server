const jwt = require("jsonwebtoken");

const isPostOwner = (post, userId) => Number(post.id_user) === Number(userId);

const hasAcceptedApplication = async (userId, postId, applications) => !!(await applications.findOne({
  where: {id_post: postId, id_user: userId, status: "accepted"}, attributes: ["id_application"],
}));

async function canAccessPost(sequelize, userId, postId) {
  const {posts, applications} = sequelize.models;

  const post = await posts.findByPk(postId, {
    attributes: ["id_post", "id_user"],
  });

  if (!post) return false;
  if (isPostOwner(post, userId)) return true;

  return hasAcceptedApplication(userId, postId, applications);
}

function registerSocketHandlers({io, sequelize}) {
  const {chat_messages} = sequelize.models;

  // Retrieve the user from the JWT token
  io.use((socket, next) => {
    try {
      const {token} = socket.handshake.auth || {};
      if (!token) return next(new Error("unauthorized"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.data.user = {
        id_user: decoded.id_user, name: decoded.name ?? "User",
      };

      if (!socket.data.user.id_user) return next(new Error("unauthorized"));
      next();
    } catch {
      next(new Error("unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id} (userId: ${socket.data.user?.id_user})`);

    socket.on("chat:join", async ({postId}, cb) => {
      try {
        const user = socket.data.user || {};
        if (!user.id_user) return cb?.({ok: false, error: "unauthorized"});
        if (!postId) return cb?.({ok: false, error: "postId_required"});

        const pid = Number(postId);
        if (!Number.isInteger(pid) || pid <= 0) {
          return cb?.({ok: false, error: "invalid_postId"});
        }

        const allowed = await canAccessPost(sequelize, user.id_user, pid);
        if (!allowed) return cb?.({ok: false, error: "forbidden"});

        const room = `post:${pid}`;

        // If already in this room, don't reload history
        if (socket.data.room === room) {
          return cb?.({ok: true, room, alreadyJoined: true});
        }

        // Switch rooms
        if (socket.data.room && socket.data.room !== room) {
          socket.leave(socket.data.room);
        }

        socket.join(room);
        socket.data.room = room;

        const last50 = await chat_messages.findAll({
          where: {id_post: pid}, order: [["created_at", "DESC"]], limit: 50,
        });

        const history = last50.reverse().map((m) => ({
          id_message: m.id_message,
          postId: m.id_post,
          id_user: m.id_user,
          user_name: m.user_name,
          message: m.message,
          created_at: m.created_at,
        }));

        cb?.({ok: true, room, history});
      } catch (e) {
        console.error("chat:join failed:", e);
        cb?.({ok: false, error: "join_failed"});
      }
    });

    socket.on("chat:message", async ({postId, message}, cb) => {
      try {
        const user = socket.data.user || {};
        if (!user.id_user) return cb?.({ok: false, error: "unauthorized"});

        const pid = Number(postId);
        if (!Number.isInteger(pid) || pid <= 0) {
          return cb?.({ok: false, error: "invalid_postId"});
        }

        const text = (message ?? "").trim();
        if (!text) {
          return cb?.({ok: false, error: "message_required"});
        }

        const allowed = await canAccessPost(sequelize, user.id_user, pid);
        if (!allowed) return cb?.({ok: false, error: "forbidden"});

        const saved = await chat_messages.create({
          id_post: pid, id_user: user.id_user, user_name: user.name ?? "User", message: text,
        });

        const payload = {
          id_message: saved.id_message,
          postId: saved.id_post,
          id_user: saved.id_user,
          user_name: saved.user_name,
          message: saved.message,
          created_at: saved.created_at,
        };

        io.to(`post:${pid}`).emit("chat:message", payload);
        cb?.({ok: true});
      } catch (e) {
        console.error("chat:message failed:", e);
        cb?.({ok: false, error: "send_failed"});
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${socket.id} (${reason})`);
    });
  });
}

module.exports = {registerSocketHandlers};