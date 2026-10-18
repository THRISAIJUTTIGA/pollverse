import mongoose from "mongoose";
const schema = new mongoose.Schema({ creator:{type:mongoose.Schema.Types.ObjectId,ref:"User"}, title:{type:String,required:true}, description:String, questions:[{type:{type:String,required:true},text:{type:String,required:true},options:[String],required:Boolean,order:Number}], isPublic:{type:Boolean,default:true},expiresAt:Date,status:{type:String,enum:["active","closed","draft"],default:"active"},totalResponses:{type:Number,default:0} },{timestamps:true});
export default mongoose.model("Survey",schema);
