const igdbService = require('../services/igdbService');
const { handleIGDBError } = require('../utils/igdbErrorHandler');

/**
 * Get multiplayer games from IGDB
 */
async function getMultiplayerGames(req, res) {
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
		return handleIGDBError(error, res, 'IGDB API Error:');
	}
}

/**
 * Search games by ID or name
 */
async function searchGames(req, res) {
	try {
		const { 
			id, 
			name, 
			limit = 1 
		} = req.query;
		
		// Validate that at least one search parameter is provided
		if (!id && !name) {
			return res.status(400).json({ 
				error: 'At least one search parameter (id or name) is required.' 
			});
		}

		// Parse ID if provided
		const parsedId = id ? parseInt(id) : undefined;
		const parsedLimit = parseInt(limit);
		
		if (id && isNaN(parsedId)) {
			return res.status(400).json({ 
				error: 'Invalid ID. Must be a number.' 
			});
		}
		
		if (isNaN(parsedLimit)) {
			return res.status(400).json({ 
				error: 'Invalid limit. Must be a number.' 
			});
		}

		// Use IGDB service to search games
		const games = await igdbService.searchGames({
			id: parsedId,
			name: name,
			limit: parsedLimit
		});
		
		res.status(200).json({
			games,
			searchCriteria: {
				id: parsedId,
				name: name,
				limit: parsedLimit
			}
		});

	} catch (error) {
		return handleIGDBError(error, res, 'IGDB Search Error:');
	}
}

/**
 * Get games with flexible criteria
 */
async function getGames(req, res) {
	try {
		const { 
			id,
			name,
			limit = 20,
			offset = 0,
			sortBy,
			sortOrder,
			...otherParams
		} = req.query;
		
		// Parse numeric parameters
		const parsedId = id ? parseInt(id) : undefined;
		const parsedLimit = parseInt(limit);
		const parsedOffset = parseInt(offset);
		
		if ((id && isNaN(parsedId)) || isNaN(parsedLimit) || isNaN(parsedOffset)) {
			return res.status(400).json({ 
				error: 'Invalid numeric parameters.' 
			});
		}

		// Use IGDB service to get games
		const games = await igdbService.getGames({
			id: parsedId,
			name: name,
			limit: parsedLimit,
			offset: parsedOffset,
			sortBy: sortBy,
			sortOrder: sortOrder,
			...otherParams
		});
		
		res.status(200).json({
			games,
			pagination: {
				limit: parsedLimit,
				offset: parsedOffset,
				count: games.length
			},
			filters: {
				id: parsedId,
				name: name,
				sortBy: sortBy,
				sortOrder: sortOrder
			}
		});

	} catch (error) {
		return handleIGDBError(error, res, 'IGDB Get Games Error:');
	}
}

module.exports = {
	getMultiplayerGames,
	searchGames,
	getGames
};