import mongoose from "mongoose";

const clearanceSchema = new mongoose.Schema({
    project_title: { type: String, required: true },
    proponent: { type: String, required: true },
    sector: { type: String, enum: ['industrial', 'infrastructure', 'mining', 'thermal power', 'nuclear', 'river valley'], default: 'industrial' },
    category: { type: String, enum: ['A', 'B', 'B1', 'B2'], default: 'A' },
    location: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['environmental', 'forest', 'wildlife', 'crz'], default: 'environmental' },
    status: { type: String, enum: ['pending', 'under_review', 'approved', 'rejected'], default: 'pending' },
    stage: { type: String, enum: ['draft', 'submitted', 'scrutiny', 'eds', 'referred', 'mom', 'finalized'], default: 'draft' },
    submittedAt: { type: Date, default: Date.now }
});

const Clearance = mongoose.models.Clearance || mongoose.model('Clearance', clearanceSchema);
export default Clearance;
