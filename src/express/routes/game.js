const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const games = await models.juego.findAll({attributes:['id_juego','nombre','img']});
	res.status(200).json(games);
};


module.exports = {getAll};