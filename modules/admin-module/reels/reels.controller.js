import { v4 as uuidv4 } from 'uuid'; 
import Reels from '../reels/reels.model.js';
import s3 from '../../../config/aws.s3.js'

const createReel = async (req, res) => {
  try {
    const { description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Video file is missing!" });
    }

    // Generate a unique key for the S3 bucket
    const key = `Reels/${uuidv4()}-${req.file.originalname}`;

    // Define S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const uploadVideo = await s3.upload(params).promise();

    // Create a new reel
    const reel = new Reels({
      video: uploadVideo.Location, 
      description,
    });

    await reel.save();

    res.status(201).json({
      message: "Reel created successfully!",
      reel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getAllReels = async (req, res) => {
    try {
      const reels = await Reels.find();
      res.status(200).json({
        message: "Reels fetched successfully",
        reels,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  const deleteReel = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the reel by ID
      const reel = await Reels.findById(id);
      if (!reel) {
        return res.status(404).json({ message: "Reel not found" });
      }
  
      // Extract the video key from the reel's video URL
      const videoKey = reel.video.split(`${process.env.AWS_BUCKET_NAME}/`)[1];
  
      // Delete the video from S3
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: videoKey,
      };
      await s3.deleteObject(params).promise();
  
      // Delete the reel from the database
      await reel.deleteOne();
  
      res.status(200).json({
        message: "Reel deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  const updateReel = async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
  
      // Find the reel by ID
      const reel = await Reels.findById(id);
      if (!reel) {
        return res.status(404).json({ message: "Reel not found" });
      }
  
      let videoURL = reel.video; // Default to existing video
  
      // If a new video is uploaded, replace the old one
      if (req.file) {
        // Extract the video key from the existing video URL
        const oldVideoKey = reel.video.split(`${process.env.AWS_BUCKET_NAME}/`)[1];
  
        // Delete the old video from S3
        const deleteParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: oldVideoKey,
        };
        await s3.deleteObject(deleteParams).promise();
  
        // Upload the new video
        const newVideoKey = `Reels/${uuidv4()}-${req.file.originalname}`;
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: newVideoKey,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        };
        const uploadVideo = await s3.upload(uploadParams).promise();
  
        videoURL = uploadVideo.Location;
      }
  
      // Update the reel in the database
      reel.description = description || reel.description;
      reel.video = videoURL;
      await reel.save();
  
      res.status(200).json({
        message: "Reel updated successfully",
        reel,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };
    
  

export default {createReel,getAllReels,updateReel,deleteReel}
