const { models } = require('../../sequelize/index');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const games = await models.juego.findAll( );
	res.status(200).json(games);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const juego = await models.juego.findByPk(id);
	if (juego[0]) {
		res.status(200).json(juego);
	} else {
		res.status(404).send('404 - Not found');
	}
};



module.exports = {
	getAll,
	getById
};