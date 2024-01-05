const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const modes = require('../routes/modes');

// Routes under the '/api/modes' path
router.get('/', handleAsyncErrors(modes.getAll));
router.post('/', handleAsyncErrors(modes.create));
router.get('/:id', handleAsyncErrors(modes.getSingle));
router.put('/:id', handleAsyncErrors(modes.update));
router.delete('/:id', handleAsyncErrors(modes.removeSingle));

module.exports = router;