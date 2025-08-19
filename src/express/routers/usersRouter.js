const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const { auth } = require('../middleware/auth');
const users = require('../routes/users');

// Routes under the '/sidekick/users' path
router.get('/', auth, handleAsyncErrors(users.getAll));
router.get('/:id/applications', auth, handleAsyncErrors(users.getApplications));
router.get('/:id/contact_inf', auth, handleAsyncErrors(users.getContact_inf));
router.get('/:id/reviews', auth, handleAsyncErrors(users.getReviews));
router.get('/:id/rewards', auth, handleAsyncErrors(users.getRewards));
router.get('/:id/stats', auth, handleAsyncErrors(users.getStats));
router.get('/:id/notifications', auth, handleAsyncErrors(users.getNotifications));
router.post('/:id/checkPassword', auth, handleAsyncErrors(users.checkPassword));
router.post('/:id/reviews', auth, handleAsyncErrors(users.addReview));
router.post('/:id/rewards/:id_reward', auth, handleAsyncErrors(users.addReward));
router.put('/:id/contact_inf/:id_contact_inf', auth, handleAsyncErrors(users.updateContact_inf));
router.put('/:id/notifications/:id_notification', auth, handleAsyncErrors(users.updateNotification));
router.delete('/:id/rewards/:id_reward', auth, handleAsyncErrors(users.useReward));
router.delete('/:id/contact_inf/:id_contact_inf', auth, handleAsyncErrors(users.removeContact_inf));
router.get('/:id', handleAsyncErrors(users.getSingle));
router.put('/:id', auth, handleAsyncErrors(users.update));
router.delete('/:id', auth, handleAsyncErrors(users.removeSingle));

module.exports = router;