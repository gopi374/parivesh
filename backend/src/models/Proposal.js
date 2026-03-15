const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    category: String,
    sector: String,
    status: { 
        type: String, 
        enum: ['draft', 'submitted', 'assigned', 'in_review', 'eds_sought', 'referred_to_mom', 'mom_ready', 'finalized', 'approved', 'rejected'],
        default: 'submitted' 
    },
    proponentEmail: String,
    submissionDate: { type: Date, default: Date.now },
    meetingDetails: {
        committee: String,
        meetingDate: Date,
        priority: String
    },
    history: [{
        status: String,
        updatedBy: String,
        updatedAt: { type: Date, default: Date.now },
        remarks: String
    }],
    metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('Proposal', proposalSchema);
