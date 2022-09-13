const { models } = require('../../sequelize/index');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const users = await models.usuarios.findAll( );
	res.status(200).json(users);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const user = await models.usuarios.findAll({ where: myBo } );
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