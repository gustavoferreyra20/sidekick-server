const isPostOwner = (post, userId) => Number(post.id_user) === Number(userId);

const hasAcceptedApplication = async (userId, postId, applications) =>
  !!(await applications.findOne({
    where: {id_post: postId, id_user: userId, status: "accepted"},
    attributes: ["id_application"],
  }));

async function canAccessPost(sequelize, userId, postId) {
  const {posts, applications} = sequelize.models;

  const post = await posts.findByPk(postId, {attributes: ["id_post", "id_user"]});
  if (!post) return false;
  if (isPostOwner(post, userId)) return true;

  return hasAcceptedApplication(userId, postId, applications);
}

module.exports = {canAccessPost};