import express from 'express'
import bannersRouter from '../modules/admin-module/banners/banners.router.js'

const app=express()

app.use("/banners",bannersRouter)

export default app