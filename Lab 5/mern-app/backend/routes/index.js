const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.post('/users', userController.createUser);
module.exports = router;

/* Here, we set up a single route that maps the /users endpoint to the createUser function in
the userController. */