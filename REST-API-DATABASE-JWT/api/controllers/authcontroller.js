const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/usermodels');
require('dotenv').config();

const authController = {

  register: (req, res) => {
    const { username, password } = req.body;
    if (!username|| !password) {
      return res.status(400).send('All fields are required');
    }
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).send('Error hashing password');
      }
      console.log(`username :${username}`);
      console.log(`password :${password}`);
      User.create({ username:username, password: hashedPassword }, (err, result) => {
        if (err) {
          return res.status(500).send('Error creating user');
        }
        res.status(201).send('User registered');
      });
    });
  },

  login: (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, (err, results) => {
      if (err) {
        return res.status(500).send('Error finding user');
      }
      if (results.length === 0) {
        return res.status(404).send('User not found');
      }
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).send('Error comparing passwords');
        }
        if (!isMatch) {
          return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({  username: user.username },"BA_secret_Key", {
          expiresIn: '6h'
        });

        res.status(200).json({ token });
      });
    });
  },
  
};

module.exports = authController;
