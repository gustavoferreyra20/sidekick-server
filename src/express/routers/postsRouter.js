const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const posts = require('../routes/posts');

// Routes under the '/sidekick/posts' path
router.get('/', handleAsyncErrors(posts.getAll));
router.post('/', handleAsyncErrors(posts.create));
router.post('/:id/applications', handleAsyncErrors(posts.apply));
router.put('/:id/applications/:id_application', handleAsyncErrors(posts.updateApplication));
router.delete('/:id/applications/:id_application', handleAsyncErrors(posts.cancelApplication));
router.get('/:id', handleAsyncErrors(posts.getSingle));
router.put('/:id', handleAsyncErrors(posts.update));
router.delete('/:id', handleAsyncErrors(posts.removeSingle));

module.exports = router;