const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { sequelize } = require('./model');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API', endpoints: ['/api/contact', '/api/health'] });
});
app.use('/api/contact', require('./routes/contact'));
app.use('/api/chat', require('./routes/chatbot'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
// chat ai removed - now using /api/chat route

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


// Sync Sequelize & start server
sequelize.authenticate()
  .then(() => {
    console.log('MySQL connected via Sequelize');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
  });
