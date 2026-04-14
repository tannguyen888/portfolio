const { sendContactEmail, saveContact, getAllContacts } = require('../service/mailer_service');

const handleSendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Save to database
    const sender = await saveContact({ name, email, message });
    console.log('DB saved, id:', sender.id);

    // Send email notification
    let emailStatus = 'not_attempted';
    try {
      const info = await sendContactEmail({ name, email, message });
      console.log('Email sent:', info.response, info.messageId);
      emailStatus = 'sent';
    } catch (mailErr) {
      console.error('Email send failed:', mailErr.message, mailErr.stack);
      emailStatus = 'failed: ' + mailErr.message;
    }

    res.json({ success: true, message: 'Message sent!', id: sender.id, emailStatus });
  } catch (err) {
    console.error('Error:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to save message' });
  }
};

const handleGetMessages = async (req, res) => {
  try {
    const messages = await getAllContacts();
    res.json(messages);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

module.exports = {
  handleSendEmail,
  handleGetMessages,
};