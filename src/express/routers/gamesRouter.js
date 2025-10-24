const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const games = require('../routes/games');

// Routes under the '/api/games' path
router.get('/', handleAsyncErrors(games.getAll));
router.get('/igdb', handleAsyncErrors(games.getIGDBGames)); // MUST be before /:id
router.post('/', handleAsyncErrors(games.create));
router.get('/:id/platforms', handleAsyncErrors(games.getPlatforms));
router.get('/:id', handleAsyncErrors(games.getSingle)); // Parameterized routes go last
router.put('/:id', handleAsyncErrors(games.update));
router.delete('/:id', handleAsyncErrors(games.removeSingle));



module.exports = router;