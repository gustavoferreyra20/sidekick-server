const express = require('express');
const router = express.Router();
const { handleAsyncErrors } = require('../middleware/errorHandler');
const images = require('../routes/images');
const uploadModule = require('../utils/upload');

router.get("/*", handleAsyncErrors(images.getSingle));
router.post('/:id_user', uploadModule.upload.single('file'), handleAsyncErrors(images.uploadProfileImage));


module.exports = router;