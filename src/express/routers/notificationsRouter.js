const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const notifications = require('../routes/notifications');

// Routes under the '/sidekick/notifications' path
router.get('/', handleAsyncErrors(notifications.getAll));
router.post('/', handleAsyncErrors(notifications.create));
router.put('/', handleAsyncErrors(notifications.bulkUpdate));
router.get('/:id', handleAsyncErrors(notifications.getSingle));
router.put('/:id', handleAsyncErrors(notifications.update));
router.delete('/:id', handleAsyncErrors(notifications.removeSingle));

module.exports = router;