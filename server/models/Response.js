import mongoose from "mongoose";
export default mongoose.model("Response",new mongoose.Schema({survey:{type:mongoose.Schema.Types.ObjectId,ref:"Survey",required:true},user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},answers:[{questionId:String,value:mongoose.Schema.Types.Mixed}]},{timestamps:true}));
