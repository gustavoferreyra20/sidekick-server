const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const contact_inf = require('../routes/contact_inf');

// Routes under the '/api/contact_inf' path
router.get('/', handleAsyncErrors(contact_inf.getAll));
router.post('/', handleAsyncErrors(contact_inf.create));
router.get('/:id', handleAsyncErrors(contact_inf.getSingle));
router.put('/:id', handleAsyncErrors(contact_inf.update));
router.delete('/:id', handleAsyncErrors(contact_inf.removeSingle));

module.exports = router;