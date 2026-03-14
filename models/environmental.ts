import mongoose from "mongoose";

const environmentalSchema = new mongoose.Schema({
    project_title: { type: String, required: true },
    proponent: { type: String, required: true },
    sector: { type: String, enum: ['industrial', 'infrastructure', 'mining', 'thermal power', 'nuclear', 'river valley'], default: 'industrial' },
    category: { type: String, enum: ['A', 'B', 'B1', 'B2'], default: 'A' },
    location: { type: String, required: true },
    description: { type: String, required: true },
    environmental_impact: { type: String },
    mitigation_measures: { type: String },
    status: { type: String, enum: ['pending', 'under_review', 'approved', 'rejected'], default: 'pending' },
    submittedAt: { type: Date, default: Date.now }
});

const Environmental = mongoose.models.Environmental || mongoose.model('Environmental', environmentalSchema);
export default Environmental;