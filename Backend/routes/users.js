const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Login Route
router.post('/login', userController.loginUser);

// Register Route (for creating a new user)
router.post('/register', userController.createUser);

module.exports = router;
