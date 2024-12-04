import Banners from './banners.model.js';
import s3 from '../../../config/aws.s3.js'
import { v4 as uuidv4 } from 'uuid'; // For unique image names

// Create a new banner
 const createBanners = async (req, res) => {
  try {
    const { bannerName } = req.body; 

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    // Upload image to S3
    const key = `banners/${uuidv4()}-${req.file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();

    // Save banner details to the database
    const banner = new Banners({
      bannerName,
      image: uploadResult.Location, // S3 URL
    });
    await banner.save();

    res.status(201).json({ message: "Banner created successfully", banner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all banners
 const getAllBanners = async (req, res) => {
  try {
    const banners = await Banners.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default {createBanners,getAllBanners}