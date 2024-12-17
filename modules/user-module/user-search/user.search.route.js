import express from 'express'

import userSearchController from './user.search.controller.js'

const router=express.Router()

router.post("/",userSearchController.createSearch)

router.get("/",userSearchController.getAllSearch)

router.get("/userId/:userId",userSearchController.getByUserIdSearch)

export default router