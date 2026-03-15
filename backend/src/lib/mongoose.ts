import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("⚠️ MONGODB_URI missing in environment variables");
}

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
    
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection FAILED:", error instanceof Error ? error.message : String(error));
    throw error;
  }
};

export default connectDB;
