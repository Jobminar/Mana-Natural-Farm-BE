import express from 'express'
import multer from 'multer'
import categoriesController from '../categories/categories.controller.js'

const router=express.Router()

const storage=multer.memoryStorage()

const upload=multer({storage}).single("image")

router.post("/",upload,categoriesController.createCategory)

router.get("/",categoriesController.getAllCategory)

export default router