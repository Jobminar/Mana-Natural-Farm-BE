import express from 'express'
import multer from 'multer'
import reelsController from './reels.controller.js'

const router=express.Router()

const storage=multer.memoryStorage()

const upload=multer({storage}).single("video")

router.post("/",upload,reelsController.createReel)

router.get("/",reelsController.getAllReels)

router.delete("/:id",reelsController.deleteReel)

router.patch("/:id",upload,reelsController.updateReel)


export default router