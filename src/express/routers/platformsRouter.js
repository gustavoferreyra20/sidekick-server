const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const platforms = require('../routes/platforms');
const igdbRoutes = require('../routes/igdb');

// Routes under the '/api/platforms' path
router.get('/', handleAsyncErrors(platforms.getAll));
router.post('/', handleAsyncErrors(platforms.create));
router.get('/:id', handleAsyncErrors(platforms.getSingle));
router.put('/:id', handleAsyncErrors(platforms.update));
router.delete('/:id', handleAsyncErrors(platforms.removeSingle));
router.get('/igdb/search', handleAsyncErrors(igdbRoutes.searchPlatforms));

module.exports = router;