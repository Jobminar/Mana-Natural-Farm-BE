import mongoose from "mongoose";

const searchSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:{type:String,required:true},
})

export default mongoose.model("Search",searchSchema)