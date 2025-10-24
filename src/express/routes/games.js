const sequelize = require('../../sequelize/index');
const isAdmin = require('../utils/isAdmin');
const igdbService = require('../services/igdbService');

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

async function getPlatforms(req, res) {
	const gameId = req.params.id;

	const game = await models.games.findByPk(gameId);

	if (!game) {
		return res.status(404).json({ error: 'Game not found' });
	}

	const platforms = await game.getPlatforms();

	res.status(200).json(platforms);
};

async function getIGDBGames(req, res) {
	console.log('IGDB Games endpoint called');
	try {
		const { 
			limit = 20, 
			offset = 0, 
			sortBy = 'rating', 
			sortOrder = 'desc' 
		} = req.query;
		
		// Parse and validate parameters
		const parsedLimit = parseInt(limit);
		const parsedOffset = parseInt(offset);
		
		if (isNaN(parsedLimit) || isNaN(parsedOffset)) {
			return res.status(400).json({ 
				error: 'Invalid parameters. Limit and offset must be numbers.' 
			});
		}

		// Use IGDB service to get multiplayer games
		const games = await igdbService.getMultiplayerGames({
			limit: parsedLimit,
			offset: parsedOffset,
			sortBy: sortBy,
			sortOrder: sortOrder
		});
		
		res.status(200).json({
			games,
			pagination: {
				limit: parsedLimit,
				offset: parsedOffset,
				count: games.length
			}
		});

	} catch (error) {
		console.error('IGDB API Error:', error);
		
		// Handle specific error types
		if (error.message.includes('credentials not configured')) {
			return res.status(500).json({ 
				error: 'IGDB service configuration error',
				message: error.message 
			});
		}
		
		if (error.message.includes('Limit must be') || error.message.includes('Offset must be')) {
			return res.status(400).json({ 
				error: 'Invalid parameters',
				message: error.message 
			});
		}
		
		if (error.message.includes('IGDB API error')) {
			return res.status(502).json({ 
				error: 'External API error',
				message: error.message 
			});
		}

		res.status(500).json({ 
			error: 'Internal server error', 
			message: error.message 
		});
	}
}

module.exports = {
	getAll: getAll,
	getSingle: getSingle,
	create: create,
	update: update,
	removeSingle: removeSingle,
	getPlatforms: getPlatforms,
	getIGDBGames: getIGDBGames,
};