const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserRole, updateUserProfile } = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize(['admin']), getAllUsers);
router.patch('/profile', authenticate, updateUserProfile);
router.patch('/:id/role', authenticate, authorize(['admin']), updateUserRole);

module.exports = router;
