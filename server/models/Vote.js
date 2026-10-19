import mongoose from "mongoose";
const schema = new mongoose.Schema({poll:{type:mongoose.Schema.Types.ObjectId,ref:"Poll",required:true},user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},deviceId:{type:String},selectedOptions:[Number]},{timestamps:true});
schema.index({poll:1,deviceId:1},{unique:true,partialFilterExpression:{deviceId:{$type:"string"}}});
export default mongoose.model("Vote",schema);
