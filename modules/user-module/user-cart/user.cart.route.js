import express from 'express'
import userCartController from './user.cart.controller.js'

const router=express.Router()

router.post("/",userCartController.createCart)

router.get("/",userCartController.getCartItemByUserId)

export default router