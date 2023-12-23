const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Login route
router.post('/login', authController.login);

// Password reset route
router.post('/password-reset', authController.resetPassword);

// Create user route
router.post('/create-user', authController.createUser);

module.exports = router;
