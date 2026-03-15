const express = require('express');
const router = express.Router();
const { generateMoM } = require('../controllers/momController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/generate', authenticate, authorize(['mom', 'admin', 'scrutiny']), generateMoM);

module.exports = router;
