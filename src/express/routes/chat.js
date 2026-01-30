const Ably = require("ably");
const {canAccessPost} = require("../services/chatService");
const sequelize = require("../../sequelize");

const ably = new Ably.Rest(process.env.ABLY_API_KEY);

function parsePostId(v) {
  const pid = Number(v);
  return Number.isInteger(pid) && pid > 0 ? pid : null;
}

async function getHistory(req, res) {
  try {
    const pid = parsePostId(req.query.postId);
    if (!pid) return res.status(400).json({ok: false, error: "invalid_postId"});

    const allowed = await canAccessPost(sequelize, req.user.id_user, pid);
    if (!allowed) return res.status(403).json({ok: false, error: "forbidden"});

    const {chat_messages} = sequelize.models;

    const last50 = await chat_messages.findAll({
      where: {id_post: pid},
      order: [["created_at", "DESC"]],
      limit: 50,
    });

    const history = last50.reverse().map((m) => ({
      id_message: m.id_message,
      postId: m.id_post,
      id_user: m.id_user,
      user_name: m.user_name,
      message: m.message,
      created_at: m.created_at,
    }));

    return res.json({ok: true, history});
  } catch (e) {
    console.error("chat/history failed:", e);
    return res.status(500).json({ok: false, error: "history_failed"});
  }
}

async function sendMessage(req, res) {
  try {
    const pid = parsePostId(req.body?.postId);
    if (!pid) return res.status(400).json({ok: false, error: "invalid_postId"});

    const text = String(req.body?.message ?? "").trim();
    if (!text) return res.status(400).json({ok: false, error: "message_required"});

    const allowed = await canAccessPost(sequelize, req.user.id_user, pid);
    if (!allowed) return res.status(403).json({ok: false, error: "forbidden"});

    const {chat_messages} = sequelize.models;

    const saved = await chat_messages.create({
      id_post: pid,
      id_user: req.user.id_user,
      user_name: req.user.name ?? "User",
      message: text,
    });

    const payload = {
      id_message: saved.id_message,
      postId: saved.id_post,
      id_user: saved.id_user,
      user_name: saved.user_name,
      message: saved.message,
      created_at: saved.created_at,
    };

    const channel = ably.channels.get(`post:${pid}`);
    await channel.publish("message", payload);

    return res.json({ok: true, payload});
  } catch (e) {
    console.error("chat/message failed:", e);
    return res.status(500).json({ok: false, error: "send_failed"});
  }
}

async function getAblyToken(req, res) {
  try {
    const pid = parsePostId(req.query.postId);
    if (!pid) return res.status(400).json({ ok: false, error: "invalid_postId" });

    const allowed = await canAccessPost(sequelize, req.user.id_user, pid);
    if (!allowed) return res.status(403).json({ ok: false, error: "forbidden" });

    const tokenRequest = await ably.auth.createTokenRequest({
      clientId: String(req.user.id_user),
      capability: {
        [`post:${pid}`]: ["subscribe"],
      },
    });

    return res.json(tokenRequest);
  } catch (e) {
    console.error("ably-token failed:", e);
    return res.status(500).json({ ok: false, error: "token_failed" });
  }
}

module.exports = {
  getHistory,
  sendMessage,
  getAblyToken,
};