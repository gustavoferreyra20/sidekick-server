const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const payments = require('../routes/payments');

// Routes under the '/api/payments' path
router.post('/mp', handleAsyncErrors(payments.createMp));

module.exports = router;