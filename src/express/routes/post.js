const { models } = require('../../sequelize/index');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const posts = await models.anuncio.findAll( );
	res.status(200).json(posts);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const post = await models.anuncio.findByPk(id);
	if (post[0]) {
		res.status(200).json(post);
	} else {
		res.status(404).send('404 - Not found');
	}
};



module.exports = {
	getAll,
	getById
};