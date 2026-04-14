const transporter = require('../config/mailer');
const { Sender } = require('../model');

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendContactEmail({ name, email, message }) {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO || process.env.MAIL_USER,
    replyTo: email,
    subject: `New Contact Message from ${name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <hr>
      <small>Sent from your portfolio contact form</small>
    `,
  };

  return transporter.sendMail(mailOptions);
}

async function saveContact({ name, email, message }) {
  return Sender.create({ name, email, message });
}

async function getAllContacts() {
  return Sender.findAll({ order: [['created_at', 'DESC']] });
}

module.exports = {
  sendContactEmail,
  saveContact,
  getAllContacts,
};
