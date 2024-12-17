import mongoose from "mongoose";

const wishlistSchema=new mongoose.Schema({
      userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
        productName:{type:String,required:true},
        productImage:{type:String,required:true},
        productSubTitle:{type:String,required:true},
        productDescription:{type:String,required:false}
})
export default mongoose.model("Wishlist",wishlistSchema)