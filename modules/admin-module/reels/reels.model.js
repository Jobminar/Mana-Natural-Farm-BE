import mongoose from "mongoose";

const reelsSchema=new mongoose.Schema({
    video:{type:String,required:true},
    description:{type:String}
})
export default mongoose.model("Reels",reelsSchema)