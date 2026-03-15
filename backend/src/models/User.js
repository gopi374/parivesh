const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // Internal identifier for linking to other systems (e.g. Firestore)
    uid: { type: String, unique: true },

    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },

    displayName: String,
    photoURL: String,
    phoneNumber: String,

    role: {
      type: String,
      enum: ['admin', 'proponent', 'scrutiny', 'mom'],
      default: 'proponent',
    },

    department: String,
    bio: String,
    preferences: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
