const sequelize = require('../../sequelize/index');
const isAdmin = require('../utils/isAdmin');

// Access models from sequelize.models
const models = sequelize.models;

models.games.belongsToMany(models.platforms, { through: 'platforms_games', foreignKey: 'id_game' })

async function getAll(req, res) {
	const games = await models.games.findAll();
	res.status(200).json(games);
}

async function getSingle(req, res) {
	const gameId = req.params.id;
	const game = await models.games.findByPk(gameId);

	if (game) {
		res.status(200).json(game);
	} else {
		res.status(404).send('404 - Not found');
	}
}


async function getPlatforms(req, res) {
	const gameId = req.params.id;

	const game = await models.games.findByPk(gameId);

	if (!game) {
		return res.status(404).json({ error: 'Game not found' });
	}

	const platforms = await game.getPlatforms();

	res.status(200).json(platforms);
};



module.exports = {
	getAll: getAll,
	getSingle: getSingle,
	getPlatforms: getPlatforms,
};