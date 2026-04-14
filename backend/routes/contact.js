const express = require('express');
const router = express.Router();
const { handleSendEmail, handleGetMessages } = require('../controller/mailerController');

// POST /api/contact - Save message + send email
router.post('/', handleSendEmail);

// GET /api/contact - Get all messages
router.get('/', handleGetMessages);

module.exports = router;
