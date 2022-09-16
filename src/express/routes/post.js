const { models } = require('../../sequelize/index');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const posts = await models.anuncio.findAll( );
	res.status(200).json(posts);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const user = await models.anuncio.findAll({ where: myBo } );
	if (user[0]) {
		res.status(200).json(user);
	} else {
		res.status(404).send('404 - Not found');
	}
};


module.exports = {
	getAll,
	getBo
};