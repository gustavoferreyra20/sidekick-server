const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const payments = require('../routes/payments');

// Routes under the '/sidekick/payments' path
router.post('/mp', handleAsyncErrors(payments.createMp));
router.post('/webhook', handleAsyncErrors(payments.receivePayment));

module.exports = router;