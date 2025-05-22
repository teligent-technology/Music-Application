// server.js (main entry point)
const cors = require('cors');
const db=require('./ConnectDb')
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./auth'); // your passport config
const personRoutes = require('./routes/personRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: 'https://music-application-frontend-bofy.onrender.com',
    credentials: true,
  }));
// Enable CORS globally with correct config

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
