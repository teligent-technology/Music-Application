const express = require('express');

const router = express.Router();
const person = require('../model.js/user');
const { jwtMiddleWare, generateToken } = require('./../jwt');

// Register new user
router.post('/', async (req, res) => {
  const { name, Mobile, username, password } = req.body;

  try {
    // You can skip manual hashing here if you have pre-save hook
    // Just create new user with raw password, pre-save will hash it
    const user = new person({
      name,
      Mobile,
      username,
      password,
      isPremium: false,
    });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Signup error:', err);
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
  try {
    const { username, password } = req.body;
    const user = await person.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);

    res.json({
      message: "Login successful",
      token,
      name: user.name,
      username: user.username,
      Mobile: user.Mobile,
      isPremium: user.isPremium || false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Logout route
router.post('/logout', (req, res) => {
  // Backend side pe JWT stateless hota hai, so hum kuch nahi karte
  return res.status(200).json({ message: 'Logout successful' });
});






module.exports = router;
