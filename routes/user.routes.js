import express from 'express'
import userSubscribeRouter from '../modules/user-module/user-subscribe/user.subscribe.route.js'
import userCartRouter from '../modules/user-module/user-cart/user.cart.route.js'
import userAuthRouter from '../modules/user-module/user-auth/user.auth.route.js'
import userSearchRouter from '../modules/user-module/user-search/user.search.route.js'
import userWishlistRouter from '../modules/user-module/user-wishlist/wishlist.route.js'
import userFeedbackRouter from '../modules/user-module/user-feedback/user.feedback.route.js'

const app=express()

app.use("/user-subscribe",userSubscribeRouter)
app.use("/user-cart",userCartRouter)
app.use("/user-auth",userAuthRouter)
app.use("/user-search",userSearchRouter)
app.use("/user-wishlist",userWishlistRouter)
app.use("/user-feedback",userFeedbackRouter)


export default app