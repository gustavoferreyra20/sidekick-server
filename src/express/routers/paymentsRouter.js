const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const { auth } = require('../middleware/auth');
const payments = require('../routes/payments');

// Routes under the '/api/payments' path
router.post('/mp', auth, handleAsyncErrors(payments.createMp));
router.post('/webhook', handleAsyncErrors(payments.receivePayment));

module.exports = router;