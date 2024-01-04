const { models } = require('../../sequelize/index');
const isAdmin = require('../utils/isAdmin');

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

async function create(req, res) {
	const gameData = req.body;

	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const game = await models.games.create(gameData);
		res.status(200).json(game);
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
}

async function update(req, res) {
	const gameId = req.params.id;
	const gameData = req.body;
	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const game = await models.games.findByPk(gameId);
		
		if (!game) {
			return res.status(404).send('404 - Not found');
		}

		await game.update(gameData);

		res.status(200).json({ message: 'Updated successfully' });
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}

}

async function removeSingle(req, res) {
	const gameId = req.params.id;
	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const game = await models.games.findByPk(gameId);

		if (game) {
			await game.destroy();
			res.status(200).json({ message: 'Deleted successfully' });
		} else {
			res.status(404).send('404 - Not found');
		}
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
}

async function join(req, res) {
	const gameId = req.params.id;
	const associationName = req.params.associationName;

	const game = await models.games.findByPk(gameId);

	if (!game) {
		return res.status(404).json({ error: 'Game not found' });
	}

	switch (associationName) {
		case "platforms":
			const platforms = await game.getPlatforms();

			res.status(200).json(platforms);
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
	removeSingle: removeSingle,
	join: join,
};