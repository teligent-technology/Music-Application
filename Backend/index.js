const express = require('express');
const cors = require('cors');
const app = express();
// const db = require('./ConnectDb');
const passport = require('./auth');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// CORS middleware sabse pehle use karo
app.use(cors({
  origin: ['https://music-application-frontend-7juq.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// OPTIONS preflight requests ke liye handle karo
app.options('*', cors());

app.use(bodyParser.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Method: ${req.method}, URL: ${req.originalUrl}`);
  next();
});

app.use(passport.initialize());
const localAuth = passport.authenticate('local', { session: false });

// Routes
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

app.listen(PORT, () => {
  console.log(`Server has connected on port ${PORT}`);
});
