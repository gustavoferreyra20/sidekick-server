const { models } = require('../../sequelize/index');
const Op = require('sequelize').Op;
const sequelize = require("../../sequelize/index");
const isAdmin = require('../utils/isAdmin');

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


	const [results, metadata] = await sequelize.query(`
	SELECT
	p.*,
	u.name AS "userName",
	u.img AS "userImg",
	g.name AS "gameName",
	g.img AS "gameImg",
	m.name AS "mode",
	pf.name AS "platform",
	ROUND(COALESCE(AVG(r.abilityscore), 0)) AS "abilityscore",
	ROUND(COALESCE(AVG(r.karmascore), 0)) AS "karmascore"
  FROM
	posts p
	INNER JOIN users u ON p.id_user = u.id_user
	INNER JOIN games g ON p.id_game = g.id_game
	INNER JOIN modes m ON p.id_mode = m.id_mode
	INNER JOIN platforms pf ON p.id_platform = pf.id_platform
	LEFT JOIN reviews r ON p.id_post = r.id_post -- Change the join condition here
	WHERE
	  1=1 ${whereClause}
	GROUP BY
	p.id_post, u.name, u.img, g.name, g.img, m.name, pf.name;
  `, { replacements: values });
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
	const currentUser = req.auth;

	let postData = (req.body);

	postData.id_user = currentUser.id_user;
	const post = await models.posts.create(postData);
	res.status(200).json(post);
};

async function update(req, res) {
	const postId = req.params.id;
	const postData = req.body;
	const currentUser = req.auth;

	const post = await models.posts.findOne({
		where: {
			id_post: postId,
			id_user: currentUser.id_user
		},
	})

	if (!post) {
		return res.status(404).send('404 - Not found');
	}

	const { title, description } = postData;

	await post.update({ title, description });

	res.status(200).json({ message: 'Updated successfully' });
}

async function removeSingle(req, res) {
	const postId = req.params.id;
	const adminStatus = await isAdmin(req);
	const post = await models.posts.findByPk(postId);
	const currentUser = req.auth;

	if (!post) {
		return res.status(404).send('404 - Not found');
	}

	if (adminStatus) {
		await post.update({ deleted: 1 });
		res.status(200).json({ message: 'Deleted successfully' });
	} else if (post.id_user == currentUser.id_user) {
		await post.update({ deleted: 1 });
		res.status(200).json({ message: 'Deleted successfully' });
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}


}

async function apply(req, res) {
	try {
		const postId = req.params.id;
		const currentUser = req.auth;

		const post = await models.posts.findByPk(postId);

		if (!post) {
			return res.status(404).json({ error: 'Post not found' });
		}

		const id_user = currentUser.id_user;

		const user = await models.users.findByPk(id_user);

		if (!user) {
			return res.status(404).json({ error: 'Users information not found' });
		}

		await post.addUser(user);

		const notificationData = {
			id_user: post.id_user,
			title: `Recibiste una solicitud`,
			message: `Recibiste una solicitud para jugar en ${post.title}`,
			deleted: false
		};

		await models.notifications.create(notificationData);
		await updateactualusers(postId);

		res.status(200).json(post);
	} catch (error) {
		console.log(error)
	}
}

async function updateApplication(req, res) {
	const postId = req.params.id;
	const applicationId = req.params.id_application;

	const post = await models.posts.findByPk(postId);

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	const status = req.query.status;

	const application = await models.applications.findByPk(applicationId);

	if (!application) {
		return res.status(404).json({ message: 'Application not found' });
	}

	application.status = status;

	await application.save();

	await updateactualusers(application.id_post, status);

	const notificationData = {
		id_user: application.id_user,
		title: (status == "accepted") ? `Su solicitud aceptada` : `Su solicitud rechazada`,
		message: (status == "accepted") ? `Su solicitud para ${post.title} ha sido aceptada` : `Su solicitud para ${post.title} ha sido rechazada`
	};

	await models.notifications.create(notificationData);

	res.status(200).json(application);
};

async function updateactualusers(id_post) {
	const post = await models.posts.findByPk(id_post);

	const actualusers = await models.users.count({
		include: [{
			model: models.posts,
			where: {
				id_post: id_post
			},
			through: {
				where: {
					[Op.or]: [
						{ status: 'accepted' },
						{ status: 'reviewed' }
					]
				}
			}
		}]
	});

	post.actualusers = actualusers;

	await post.save();
}

async function cancelApplication(req, res) {
	const postId = req.params.id;
	const currentUser = req.auth;
	const post = await models.posts.findByPk(postId);

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	const application = await models.applications.findOne({
		where: {
			id_post: postId,
			id_user: currentUser.id_user
		},
	})

	const user = await models.users.findByPk(application.id_user);

	if (!application) {
		return res.status(404).json({ message: 'Application not found' });
	}

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	await user.removePosts(post);

	await updateactualusers(application.id_post);

	const notificationData = {
		id_user: application.id_user,
		title: `Solicitud cancelada`,
		message: `Han cancelado una solicitud en ${post.title}`
	};

	await models.notifications.create(notificationData);

	res.status(200).json({ message: 'Deleted successfully' });


};

module.exports = {
	getAll: getAll,
	getSingle: getSingle,
	create: create,
	update: update,
	updateApplication: updateApplication,
	removeSingle: removeSingle,
	cancelApplication: cancelApplication,
	apply: apply,
};