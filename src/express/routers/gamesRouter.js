const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const games = require('../routes/games');

// Routes under the '/sidekick/games' path
router.get('/', handleAsyncErrors(games.getAll));
router.post('/', handleAsyncErrors(games.create));
router.get('/:id/platforms', handleAsyncErrors(games.getPlatforms));
router.get('/:id', handleAsyncErrors(games.getSingle));
router.put('/:id', handleAsyncErrors(games.update));
router.delete('/:id', handleAsyncErrors(games.removeSingle));



module.exports = router;