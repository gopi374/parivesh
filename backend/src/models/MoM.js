const mongoose = require('mongoose');

const momSchema = new mongoose.Schema({
    proposalId: { type: String, required: true },
    meetingDate: { type: Date, required: true },
    committee: String,
    chairman: String,
    content: { type: String, required: true }, // HTML content from editor
    gist: String,
    status: { 
        type: String, 
        enum: ['draft', 'finalized'],
        default: 'draft'
    },
    finalizedAt: Date,
    finalizedBy: String,
    pdfUrl: String
}, { timestamps: true });

module.exports = mongoose.model('MoM', momSchema);
