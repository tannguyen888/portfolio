const express = require('express');
const router = express.Router();
const { handleChat } = require('../controller/chatbotController');

// POST /api/chat - Send message, get AI reply
router.post('/', handleChat);

module.exports = router;
