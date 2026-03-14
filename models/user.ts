import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    project_title : { type: String, required: true },
    Proposal_name: { type: String, required: true, unique: false },
    sector: { type: String, enum: ['industrial', 'infrastructure', 'mining','thermal power','nuclear','river valley'], default: 'industrial' },
    product_category: { type: String, enum: ['A', 'B', 'B1', 'B2'], default: 'A' },
    product_location: { type: String, required: true },
    product_description: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
