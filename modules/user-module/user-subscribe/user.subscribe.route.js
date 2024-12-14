import express from 'express'
import userSubscribeController from "./user.subscribe.controller.js";

const router=express.Router()

router.post("/",userSubscribeController.createSubscription)

router.post("/send-notifications",userSubscribeController.sendNotificationToAllSubscribers)

router.get("/",userSubscribeController.getAllSubscribers)

export default router