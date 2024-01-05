const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const auth = require('../routes/auth');

// Routes under the '/api/auth' path
router.post('/validate', handleAsyncErrors(auth.validate));
router.post('/login', handleAsyncErrors(auth.login));
router.post('/register', handleAsyncErrors(auth.register));
router.post('/:id/contact_inf/:associationId', handleAsyncErrors(auth.addContactInf));

module.exports = router;