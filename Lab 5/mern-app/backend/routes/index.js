const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;

/* Here, we set up a single route that maps the /users endpoint to the createUser function in
the userController. */