// src/api/auth/register.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/User'); // Assume a Mongoose model is defined

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }
    const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.trim() }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or username already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username: username.trim(), email: email.toLowerCase(), password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser._id,
      username: newUser.username,
      token: token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

module.exports = router;
