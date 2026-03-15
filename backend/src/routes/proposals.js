const express = require('express');
const router = express.Router();
const { getAllProposals, createProposal, getProposalById, updateProposalStatus } = require('../controllers/proposalController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, getAllProposals);
router.get('/:id', authenticate, getProposalById);
router.post('/', authenticate, authorize(['proponent', 'admin']), createProposal);
router.patch('/:id/status', authenticate, authorize(['scrutiny', 'admin']), updateProposalStatus);

module.exports = router;
