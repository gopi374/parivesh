import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['proponent', 'admin', 'scrutiny', 'mom'], default: 'proponent' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date }
});

// Hash password before saving
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

const AuthUser = mongoose.models.AuthUser || mongoose.model('AuthUser', userSchema);
export default AuthUser;
