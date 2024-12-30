import express from 'express'
import userCartController from './user.cart.controller.js'

const router=express.Router()

router.post("/",userCartController.createCart)

router.get("/userId/:userId",userCartController.getCartItemByUserId)

router.delete('/userId/:userId/itemId/:id', userCartController.deleteCartItems);

router.delete("/userId/:userId",userCartController.deleteAllCartItems)

export default router