const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const games = require('../routes/games');
const igdbRoutes = require('../routes/igdb');

// Routes under the '/api/games' path
router.get('/', handleAsyncErrors(games.getAll));
router.get('/igdb', handleAsyncErrors(igdbRoutes.getMultiplayerGames));
router.get('/igdb/search', handleAsyncErrors(igdbRoutes.searchGames));
router.get('/:id/platforms', handleAsyncErrors(games.getPlatforms));
router.get('/:id', handleAsyncErrors(games.getSingle));

module.exports = router;