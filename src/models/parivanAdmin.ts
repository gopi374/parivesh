import connectToAdminDatabase from '@/lib/adminMongoose';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const parivanAdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'scrutiny', 'proponent', 'mom'], default: 'proponent' },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date }
});

// Hash password before saving (only if it was modified)
parivanAdminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

parivanAdminSchema.methods.comparePassword = async function (candidatePassword: string) {
    // If password stored in plaintext (legacy), compare directly first
    if (candidatePassword === this.password) return true;
    return bcrypt.compare(candidatePassword, this.password);
};

const getParivanAdminModel = async () => {
    const conn = await connectToAdminDatabase();
    return conn.models.ParivanAdmin || conn.model('ParivanAdmin', parivanAdminSchema, 'parivan_admins');
};

export default getParivanAdminModel;
