const { models } = require('../../sequelize/index');
const Op = require('sequelize').Op;
models.users.belongsToMany(models.posts, { through: 'applications', foreignKey: 'id_user' });
models.posts.belongsToMany(models.users, { through: 'applications', foreignKey: 'id_post' });
const sequelize = require("../../sequelize/index");

async function getAll(req, res) {
	const [results, metadata] = await sequelize.query('SELECT 	p.*, u.name AS userName, u.img AS userImg, g.name AS gameName, g.img AS gameImg, m.name AS mode, pf.name AS platform, ROUND(IFNULL(AVG(r.abilityScore), 0)) AS abilityScore, ROUND(IFNULL(AVG(r.karmaScore), 0)) AS karmaScore FROM posts p INNER JOIN users u ON p.id_user = u.id_user INNER JOIN games g ON p.id_game = g.id_game INNER JOIN modes m ON p.id_mode = m.id_mode INNER JOIN platforms pf ON p.id_platform = pf.id_platform LEFT JOIN reviews r ON p.id_user = r.id_user GROUP BY p.id_post ');
	res.status(200).json(results);
};

async function getBo(req, res) {
	let myBo = (req.query);
	let whereClause = '';
	let values = [];

	if (myBo.id_game) {
		whereClause += ' AND p.id_game = ?';
		values.push(myBo.id_game);
	}
	if (myBo.id_platform) {
		whereClause += ' AND p.id_platform = ?';
		values.push(myBo.id_platform);
	}
	if (myBo.id_mode) {
		whereClause += ' AND p.id_mode = ?';
		values.push(myBo.id_mode);
	}

	const [results, metadata] = await sequelize.query(`SELECT p.*, u.name AS userName, g.name AS gameName, g.img AS gameImg, m.name AS mode, pf.name AS platform, ROUND(IFNULL(AVG(r.abilityScore), 0)) AS abilityScore, ROUND(IFNULL(AVG(r.karmaScore), 0)) AS karmaScore FROM posts p INNER JOIN users u ON p.id_user = u.id_user INNER JOIN games g ON p.id_game = g.id_game INNER JOIN modes m ON p.id_mode = m.id_mode INNER JOIN platforms pf ON p.id_platform = pf.id_platform LEFT JOIN reviews r ON p.id_user = r.id_user WHERE 1=1 ${whereClause} GROUP BY p.id_post`, { replacements: values });
	res.status(200).json(results);
};

async function create(req, res) {
	let myBo = (req.body);
	const post = await models.posts.create(myBo);
	res.status(200).json(post);

};

async function update(req, res) {
	let myBo = (req.query);
	const posts = await models.posts.update(JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	})
	res.status(200).json(posts);
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const posts = await models.posts.destroy({
		where: myBo
	});
	res.status(200).json(posts);
};

async function join(req, res) {
	let myBo = (req.query);

	if (myBo.type == 'received') {
		const usersPosts = await models.posts.findAll({
			where: { id_user: myBo.id_user },
			include: [{
				model: models.users,
				attributes: { exclude: ['password'] },
			}],

		})

		res.status(200).json(usersPosts);
	}

	if (myBo.type == 'sended') {
		const usersPosts = await models.users.findAll({
			where: { id_user: myBo.id_user },
			attributes: [],
			include: [{
				model: models.posts,
				attributes: { exclude: ['password'] },
				through: {
					attributes: ['status'],
					where: { id_post: (myBo.id_post) ? myBo.id_post : { [Op.ne]: null } }
				}
			}],

		})

		res.status(200).json(usersPosts[0].posts);
	}

};

async function joinUpdate(req, res) {
	let myBo = (req.query);

	const user = await models.users.findByPk(myBo.id_user);
	const post = await models.posts.findByPk(myBo.id_post);
	res.status(200).json(await user.addPosts(post, { through: { status: myBo.status } }));
};

async function joinDelete(req, res) {
	let myBo = (req.query);
	const user = await models.users.findByPk(myBo.id_user);
	const post = await models.posts.findByPk(myBo.id_post);
	try {
		res.status(200).json(await user.removePosts(post));
	} catch (e) {
		console.error(e);
	}

};

module.exports = {
	getAll,
	getBo,
	create,
	joinUpdate,
	removeBo,
	join,
	joinDelete
};