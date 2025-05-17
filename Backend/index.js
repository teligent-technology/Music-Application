// server.js (main entry point)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./auth'); // your passport config
const personRoutes = require('./routes/personRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS globally with correct config
app.use(cors({
  origin: 'https://music-application-frontend-7juq.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Handle preflight requests globally (optional, cors middleware usually does this)
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://music-application-frontend-7juq.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

app.use(bodyParser.json());

app.use(passport.initialize());

// Optional: simple logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Use your routes (without any additional CORS middleware inside routes)
app.use('/person', personRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
