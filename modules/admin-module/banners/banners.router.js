import express from 'express';
import multer from 'multer';
import bannerController from './banners.controller.js';

const router = express.Router();
const upload = multer(); // Memory storage for handling file uploads

router.post('/',upload.single('image'), bannerController.createBanners); // Endpoint to create a banner
router.get('/', bannerController.getAllBanners); // Endpoint to get all banners

export default router;
