const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Public auth endpoints
router.post('/register', register);
router.post('/login', login);

// Current user
router.get('/me', authenticate, me);

module.exports = router;
