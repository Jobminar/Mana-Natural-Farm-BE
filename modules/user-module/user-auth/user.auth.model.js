import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    mobile:{type:Number,required:true},
    email:{type:String,default:""},
    name:{type:String,default:""},
    otp:{type:Number},
    otpCreatedAt:{type:Number}
})

export default mongoose.model("User",userSchema)