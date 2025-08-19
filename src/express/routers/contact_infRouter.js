const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const { auth } = require('../middleware/auth');
const contact_inf = require('../routes/contact_inf');

// Routes under the '/sidekick/contact_inf' path
router.get('/', handleAsyncErrors(contact_inf.getAll));
router.post('/', auth, handleAsyncErrors(contact_inf.create));
router.get('/:id', auth, handleAsyncErrors(contact_inf.getSingle));
router.put('/:id', auth, handleAsyncErrors(contact_inf.update));
router.delete('/:id', auth, handleAsyncErrors(contact_inf.removeSingle));

module.exports = router;