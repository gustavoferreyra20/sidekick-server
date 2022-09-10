const { models } = require('../../sequelize/index');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const users = await models.usuarios.findAll( );
	res.status(200).json(users);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const user = await models.usuarios.findByPk(id);
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).send('404 - Not found');
	}
};



module.exports = {
	getAll,
	getById
};