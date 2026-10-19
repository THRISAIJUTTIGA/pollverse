import mongoose from "mongoose";
import Vote from "../models/Vote.js";
export async function connectDatabase() {
  if (!process.env.MONGO_URI) return false;
  await mongoose.connect(process.env.MONGO_URI);
  await Vote.syncIndexes();
  console.log("MongoDB connected");
  return true;
}
