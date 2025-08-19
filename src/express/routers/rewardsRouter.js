const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const rewards = require('../routes/rewards');

// Routes under the '/sidekick/rewards' path
router.get('/', handleAsyncErrors(rewards.getAll));
router.post('/', handleAsyncErrors(rewards.create));
router.get('/:id', handleAsyncErrors(rewards.getSingle));
router.put('/:id', handleAsyncErrors(rewards.update));
router.delete('/:id', handleAsyncErrors(rewards.removeSingle));

module.exports = router;