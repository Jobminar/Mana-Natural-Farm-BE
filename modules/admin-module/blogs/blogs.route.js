import express from 'express'

import multer from 'multer'

import blogsController from './blogs.controller.js'

const router=express.Router()

const storage=multer.memoryStorage()

const upload=multer({storage}).single("blogsImage")

router.post("/",upload,blogsController.createBlog)

router.get("/",blogsController.getAllBlogs)

router.patch("/:id",blogsController.editBlog)

router.delete("/:id",blogsController.deleteBlog)

export default router