import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.MongoURL;

if (!MONGODB_URI) {
    console.error("🚫 MongoDB URI missing in .env.local");
    process.exit(1);
}

const connectionToDatabase = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return; // Already connected
        }
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB at", MONGODB_URI.split('@')[1] || MONGODB_URI);
        console.log("📊 Ready state:", mongoose.connection.readyState);
    } catch (error) {
        console.error("❌ MongoDB Connection FAILED:", error instanceof Error ? error.message : String(error));
        console.error("URI check:", MONGODB_URI ? "Set ✓" : "Missing ✗");
        throw error;
    }
};

export default connectionToDatabase;
