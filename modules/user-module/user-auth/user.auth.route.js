import express from 'express'

import userAuthController from './user.auth.controller.js'

const router=express.Router()

router.post("/send-otp",userAuthController.sendOtp)

router.post("/verify-otp",userAuthController.verifyOtp)

router.get("/:id",userAuthController.getByUserId)

router.get("/",userAuthController.getAllUsers)

export default router  