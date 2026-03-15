const express = require('express');
const router = express.Router();
const { referToMoM, getAssignedTasks } = require('../controllers/scrutinyController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/tasks', authenticate, authorize(['scrutiny', 'admin']), getAssignedTasks);
router.patch('/refer-mom/:id', authenticate, authorize(['scrutiny', 'admin']), referToMoM);

module.exports = router;
