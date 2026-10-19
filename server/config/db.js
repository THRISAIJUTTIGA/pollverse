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
  const duplicateGroups = await Vote.aggregate([
    { $match: { deviceId: { $type: "string" } } },
    { $sort: { createdAt: 1, _id: 1 } },
    { $group: { _id: { poll: "$poll", deviceId: "$deviceId" }, ids: { $push: "$_id" }, count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } },
  ]);
  const duplicateIds = duplicateGroups.flatMap((group) => group.ids.slice(1));
  if (duplicateIds.length) await Vote.deleteMany({ _id: { $in: duplicateIds } });
  await Vote.syncIndexes();
  console.log("MongoDB connected");
  return true;
}
