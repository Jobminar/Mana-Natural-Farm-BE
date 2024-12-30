import express from 'express'
import userSubscribeRouter from '../modules/user-module/user-subscribe/user.subscribe.route.js'
import userCartRouter from '../modules/user-module/user-cart/user.cart.route.js'
import userAuthRouter from '../modules/user-module/user-auth/user.auth.route.js'
import userSearchRouter from '../modules/user-module/user-search/user.search.route.js'
import userWishlistRouter from '../modules/user-module/user-wishlist/wishlist.route.js'
import userFeedbackRouter from '../modules/user-module/user-feedback/user.feedback.route.js'
import userContactUsRouter from '../modules/user-module/contact-us/contactus.router.js'
import userFaqRouter from '../modules/user-module/user-faq/faq.router.js'
import userAddressRouter from '../modules/user-module/user-address/user.address.route.js'

const app=express()

app.use("/user-subscribe",userSubscribeRouter)
app.use("/user-cart",userCartRouter)
app.use("/user-auth",userAuthRouter)
app.use("/user-search",userSearchRouter)
app.use("/user-wishlist",userWishlistRouter)
app.use("/user-feedback",userFeedbackRouter)
app.use("/user-contactus",userContactUsRouter)
app.use("/user-faq",userFaqRouter)
app.use("/user-address",userAddressRouter)
export default app