import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.MongoURL;

if (!MONGODB_URI) {
    console.error("🚫 MongoDB URI missing in .env.local");
    process.exit(1);
}

let cachedConnection: mongoose.Connection | null = null;

const connectToAdminDatabase = async () => {
    try {
        if (cachedConnection && cachedConnection.readyState >= 1) {
            return cachedConnection;
        }

        const conn = await mongoose.createConnection(MONGODB_URI, {
            dbName: 'admin',
        });

        console.log("✅ Connected to MongoDB admin database");
        cachedConnection = conn;
        return conn;
    } catch (error) {
        console.error("❌ MongoDB Admin Connection FAILED:", error instanceof Error ? error.message : String(error));
        throw error;
    }
};

export default connectToAdminDatabase;
