const express = require('express');
const authController = require('../controllers/authcontroller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

//Login and registration of the user
router.post('/registeruser', authController.register);
router.post('/login', authController.login);

//Other CRUD operations on the Demo
router.get('/user',authController.findall);

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).send('This is a protected route');
});

module.exports = router;
