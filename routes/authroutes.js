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
//Get all users
router.get('/users',authMiddleware,crudController.users);

//Get Particular user from the database
router.get('/user/findUser/:id',authMiddleware,crudController.find);
//Delete a user
router.delete('/user/deleteUser/:username',authMiddleware,crudController.delete);

//Partially Update Information
router.patch('/user/UpdateInfoPartially/:id',authMiddleware,crudController.PatchInfo);
//Fully Update user Information
router.put('/user/UpdateInfo/:id',authMiddleware,crudController.PutInfo);

//Add User Information
router.post('/user/AddInfo',authMiddleware,crudController.AddInfo);

module.exports = router;
