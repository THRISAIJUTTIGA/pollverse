import mongoose from "mongoose";
export default mongoose.model("Comment",new mongoose.Schema({poll:{type:mongoose.Schema.Types.ObjectId,ref:"Poll",required:true},user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},text:{type:String,required:true,maxlength:500}},{timestamps:true}));
