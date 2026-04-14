const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: process.env.MAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Verify transporter on startup
transporter.verify()
  .then(() => console.log('Mail server connected'))
  .catch((err) => console.error('Mail server error:', err.message));

module.exports = transporter;

