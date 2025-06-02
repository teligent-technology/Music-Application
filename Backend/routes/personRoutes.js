const express = require('express');

const router = express.Router();
const person = require('../model.js/user');
const { jwtMiddleWare, generateToken } = require('./../jwt');

// Register new user
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new person({
      username,
      password: hashedPassword,
      isPremium: false,
    });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Get all users (protected)
router.get('/', jwtMiddleWare, async (req, res) => {
  try {
    const data = await person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;

    const response = await person.findByIdAndUpdate(personId, updatePersonData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data deleted");
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
// Backend: /login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await person.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Send user data including premium status to client
    res.json({
      username: user.username,
      isPremium: user.isPremium,
      // other info or token
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  // Backend side pe JWT stateless hota hai, so hum kuch nahi karte
  return res.status(200).json({ message: 'Logout successful' });
});






module.exports = router;
