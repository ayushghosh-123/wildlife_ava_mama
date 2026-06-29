//  connect with mongoose and check the mongoose connection 
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your_default_mongo_uri";

if (!MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Db connection is already established')
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }
  try {
    const conn = await cached.promise;
    console.log("✅ MongoDB connected");
    return conn;
  } catch (e) {
    console.error("❌ MongoDB connection error:", e);
    cached.promise = null; // reset on failure
    throw e;
  }
}

export default dbConnect;
