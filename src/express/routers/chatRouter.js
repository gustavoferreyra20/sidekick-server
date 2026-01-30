const express = require('express');
const {chatAuth} = require("../middleware/chatAuth");
const {getHistory, sendMessage, getAblyToken} = require("../routes/chat");

const router = express.Router();

router.get("/history", chatAuth, getHistory);
router.post("/message", chatAuth, sendMessage);
router.get("/ably-token", chatAuth, getAblyToken);

module.exports = router;
