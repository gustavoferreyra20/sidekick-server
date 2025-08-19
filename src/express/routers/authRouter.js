const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const auth = require('../routes/auth');

// Routes under the '/sidekick/auth' path
router.post('/validate', handleAsyncErrors(auth.validate));
router.post('/login', handleAsyncErrors(auth.login));
router.post('/resetPassword', handleAsyncErrors(auth.resetPassword));
router.post('/register', handleAsyncErrors(auth.register));
router.post('/token', handleAsyncErrors(auth.storeToken));
router.post('/:id/contact_inf/:id_contact_inf', handleAsyncErrors(auth.addContactInf));

module.exports = router;