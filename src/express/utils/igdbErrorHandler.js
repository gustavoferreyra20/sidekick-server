/**
 * Handle IGDB API errors consistently
 * @param {Error} error - The error object
 * @param {Object} res - Express response object
 * @param {string} context - Context for logging (e.g., 'IGDB API Error', 'IGDB Search Error')
 */
function handleIGDBError(error, res, context = 'IGDB Error') {
	console.error(context, error);
	
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

	return res.status(500).json({ 
		error: 'Internal server error', 
		message: error.message 
	});
}

module.exports = { handleIGDBError };