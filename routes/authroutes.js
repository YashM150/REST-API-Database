const express = require('express');
const authController = require('../controllers/authcontroller');
const  crudController = require('../controllers/crudcontroller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

//Login and registration of the user
router.post('/registeruser', authController.register);
router.post('/login', authController.login);

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).send('This is a protected route');
});

//Other CRUD operations on the Demo
router.get('/users',authMiddleware,crudController.users);
module.exports = router;
