const { models } = require('../../sequelize/index');
const Op = require('sequelize').Op;
const sequelize = require("../../sequelize/index");

models.posts.belongsToMany(models.users, { through: 'applications', foreignKey: 'id_post' });

async function getAll(req, res) {
	let postData = (req.query);
	let whereClause = '';
	let values = [];

	if (postData.id_game) {
		whereClause += ' AND p.id_game = ?';
		values.push(postData.id_game);
	}
	if (postData.id_platform) {
		whereClause += ' AND p.id_platform = ?';
		values.push(postData.id_platform);
	}
	if (postData.id_mode) {
		whereClause += ' AND p.id_mode = ?';
		values.push(postData.id_mode);
	}

	const [results, metadata] = await sequelize.query(`SELECT p.*, u.name AS userName, u.img AS userImg, g.name AS gameName, g.img AS gameImg, m.name AS mode, pf.name AS platform, ROUND(IFNULL(AVG(r.abilityScore), 0)) AS abilityScore, ROUND(IFNULL(AVG(r.karmaScore), 0)) AS karmaScore FROM posts p INNER JOIN users u ON p.id_user = u.id_user INNER JOIN games g ON p.id_game = g.id_game INNER JOIN modes m ON p.id_mode = m.id_mode INNER JOIN platforms pf ON p.id_platform = pf.id_platform LEFT JOIN reviews r ON p.id_user = r.id_user WHERE 1=1 ${whereClause} GROUP BY p.id_post`, { replacements: values });
	res.status(200).json(results);
};

async function getSingle(req, res) {
	const postId = req.params.id;
	const post = await models.posts.findByPk(postId);

	if (post) {
		res.status(200).json(post);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let postData = (req.body);
	const post = await models.posts.create(postData);
	res.status(200).json(post);
};

async function update(req, res) {
	const postId = req.params.id;
	const postData = req.body;

	const [updatedRows] = await models.posts.update(postData, {
		where: { id_post: postId },
	});

	if (updatedRows > 0) {
		res.status(200).json({ message: 'Updated successfully' });
	} else {
		res.status(404).send('404 - Not found');
	}
}


async function removeSingle(req, res) {
	const postId = req.params.id;
	const post = await models.posts.findByPk(postId);

	if (post) {
		await post.destroy();
		res.status(200).json({ message: 'Deleted successfully' });
	} else {
		res.status(404).send('404 - Not found');
	}
}

async function joinPost(req, res) {
	const postId = req.params.id;
	const associationName = req.params.associationName;

	const post = await models.posts.findByPk(postId);

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	switch (associationName) {
		case "applications":
			const id_user = req.params.associationId;

			const user = await models.users.findByPk(id_user);

			if (!user) {
				return res.status(404).json({ error: 'Users information not found' });
			}

			await post.addUser(user);

			await updateActualUsers(postId);

			res.status(200).json(post);
			break;

		default:
			res.status(404).json({ error: 'Association not found' });
			break;
	}
}

async function joinUpdate(req, res) {
	const postId = req.params.id;
	const associationName = req.params.associationName;

	const post = await models.posts.findByPk(postId);

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	switch (associationName) {
		case "applications":
			const applicationId = req.params.associationId;
			const status = req.query.status;

			const application = await models.applications.findByPk(applicationId);

			if (!application) {
				return res.status(404).json({ message: 'Application not found' });
			}

			application.status = status;

			await application.save();

			await updateActualUsers(application.id_post, status);

			res.status(200).json(application);
			break;

		default:
			res.status(404).json({ error: 'Association not found' });
			break;
	}
};

async function updateActualUsers(id_post) {
	const post = await models.posts.findByPk(id_post);

	const actualUsers = await models.users.count({
		include: [{
			model: models.posts,
			where: {
				id_post: id_post
			},
			through: {
				where: {
					status: 'accepted'
				}
			}
		}]
	});

	post.actualUsers = actualUsers;

	await post.save();
}

async function joinDelete(req, res) {
	const postId = req.params.id;
	const associationName = req.params.associationName;

	const post = await models.posts.findByPk(postId);

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	switch (associationName) {
		case "applications":
			const applicationId = req.params.associationId;
			const application = await models.applications.findByPk(applicationId);
			const user = await models.users.findByPk(application.id_user);

			if (!application) {
				return res.status(404).json({ message: 'Application not found' });
			}

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			await user.removePosts(post);

			await updateActualUsers(application.id_post);

			res.status(200).json({ message: 'Deleted successfully' });
			break;

		default:
			res.status(404).json({ error: 'Association not found' });
			break;
	}

};

module.exports = {
	getAll: getAll,
	getSingle: getSingle,
	create: create,
	update: update,
	joinUpdate: joinUpdate,
	removeSingle: removeSingle,
	joinDelete: joinDelete,
	joinPost: joinPost,
};