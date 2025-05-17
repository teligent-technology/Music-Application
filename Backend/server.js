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
const corsOptions = {
  origin: 'https://music-application-1-k531.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Optional: Explicitly handle OPTIONS preflight globally
app.options('*', cors(corsOptions));

// app.use((req, res, next) => {
//   if (req.method === 'OPTIONS') {
//     console.log('Received OPTIONS request for:', req.originalUrl);
//   }
//   next();
// });



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
