import mongoose from "mongoose";
const schema = new mongoose.Schema({poll:{type:mongoose.Schema.Types.ObjectId,ref:"Poll",required:true},user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},ipHash:String,selectedOptions:[Number]},{timestamps:true});
schema.index({poll:1,user:1}); schema.index({poll:1,ipHash:1});
export default mongoose.model("Vote",schema);
