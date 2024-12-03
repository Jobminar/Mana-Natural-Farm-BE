import express from 'express'
import usersRouter from '../routes/user.routes.js'

const app=express()

app.use("/admin",adminRouter)

app.use("/users",usersRouter)

export default app