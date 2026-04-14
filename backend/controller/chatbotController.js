const { chat } = require('../service/chatbot_service');

const handleChat = async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (message.length > 500) {
    return res.status(400).json({ error: 'Message too long (max 500 characters)' });
  }

  try {
    const reply = await chat(message, history || []);
    res.json({ reply });
  } catch (err) {
    console.error('OpenAI Error:', err.message);
    res.status(500).json({ error: 'AI is not available right now' });
  }
};

module.exports = { handleChat };
