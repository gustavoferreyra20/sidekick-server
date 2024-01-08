const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const users = require('../routes/users');

// Routes under the '/api/users' path
router.get('/', handleAsyncErrors(users.getAll));
router.get('/:id/applications', handleAsyncErrors(users.getApplications));
router.get('/:id/contact_inf', handleAsyncErrors(users.getContact_inf));
router.get('/:id/reviews', handleAsyncErrors(users.getReviews));
router.get('/:id/rewards', handleAsyncErrors(users.getRewards));
router.get('/:id/stats', handleAsyncErrors(users.getStats));
router.get('/:id/notifications', handleAsyncErrors(users.getNotifications));
router.post('/:id/reviews', handleAsyncErrors(users.addReview));
router.post('/:id/rewards/:id_reward', handleAsyncErrors(users.addReward));
router.put('/:id/contact_inf/:id_contact_inf', handleAsyncErrors(users.updateContact_inf));
router.put('/:id/notifications/:id_notification', handleAsyncErrors(users.updateNotification));
router.delete('/:id/rewards/:id_reward', handleAsyncErrors(users.useReward));
router.delete('/:id/contact_inf/:id_contact_inf', handleAsyncErrors(users.removeContact_inf));
router.get('/:id', handleAsyncErrors(users.getSingle));
router.put('/:id', handleAsyncErrors(users.update));
router.delete('/:id', handleAsyncErrors(users.removeSingle));

module.exports = router;