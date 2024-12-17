import mongoose from 'mongoose'

const blogsSchema=new mongoose.Schema({
blogsImage:{type:String,required:true},
date:{type:Date},
title:{type:String,required:true},
description:{type:String}
})

export default mongoose.model("Blogs",blogsSchema)