const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const reviews = require('../routes/reviews');

// Routes under the '/sidekick/reviews' path
router.get('/', handleAsyncErrors(reviews.getAll));
router.post('/', handleAsyncErrors(reviews.create));
router.post('/:id/rewards/:id_reward', handleAsyncErrors(reviews.addReward));
router.get('/:id', handleAsyncErrors(reviews.getSingle));
router.put('/:id', handleAsyncErrors(reviews.update));
router.delete('/:id', handleAsyncErrors(reviews.removeSingle));

module.exports = router;