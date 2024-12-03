import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/index.js'

dotenv.config()

const PORT=process.env.PORT 

const app=express()

app.use(cors())

app.use("/",router)

app.use(express.json({limit:"100mb"}))

mongoose.connect(process.env.MONGO_URI)

.then(()=>console.log('mongodb connected successfully'))
.catch((error)=>console.log('disconnected mongodb',error.message))

app.listen(PORT,()=>console.log(`server running ${PORT}`))  