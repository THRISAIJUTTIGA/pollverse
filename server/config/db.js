import mongoose from "mongoose";
import Vote from "../models/Vote.js";
export async function connectDatabase() {
  if (!process.env.MONGO_URI) return false;
  await mongoose.connect(process.env.MONGO_URI);
  try {
    await Vote.collection.dropIndex("poll_1_deviceId_1");
  } catch (error) {
    if (error?.codeName !== "IndexNotFound" && error?.code !== 27) throw error;
  }
  await Vote.syncIndexes();
  console.log("MongoDB connected");
  return true;
}
