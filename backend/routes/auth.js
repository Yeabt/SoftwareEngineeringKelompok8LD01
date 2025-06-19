const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../models/User'); // Import User model

// Create model
const User = mongoose.model('User', UserModel.userSchema, 'users'); // 'users' is collection name

//New Register route
router.post('/signup', async (req, res) => {
  // UserModel.create(req.body)
  // .then(User => res.json(User))
  // .catch(err => res.json(err))
  try {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(404).json({ message: 'Email already used' });
    }
    //success
    UserModel.create(req.body)
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    // console.error('Signup Error:', error);
    return res.status(500).json({ message: 'Email already used' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No such account exists' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    // Success
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router;

// old version
// Define user schema
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// });


// Register route
// router.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const newUser = new User({username, email, password });
//     await newUser.save();
//     res.json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Signup Error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });
