import express from 'express'
import userSubscribeRouter from '../modules/user-module/user-subscribe/user.subscribe.route.js'
import userCartRouter from '../modules/user-module/user-cart/user.cart.route.js'
const app=express()

app.use("/user-subscribe",userSubscribeRouter)
app.use("/user-cart",userCartRouter)


export default app