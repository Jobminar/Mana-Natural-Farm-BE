import Blogs from '../blogs/blogs.model.js'
import s3 from '../../../config/aws.s3.js';
import {v4 as uuidv4} from 'uuid'
const createBlog = async (req, res) => {
    try {
      const { title,description,date } = req.body; 
  
      if (!req.file) {
        return res.status(400).json({ message: "Image file is required." });
      }
  
      // Upload image to S3
      const key = `blogs/${uuidv4()}-${req.file.originalname}`;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
  
      const uploadResult = await s3.upload(params).promise();
  
      // Save banner details to the database
      const banner = new Blogs({
        title,
        description,
        date,
        blogsImage: uploadResult.Location, // S3 URL
      });
      await banner.save();
  
      res.status(201).json({ message: "Banner created successfully", banner });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getAllBlogs=async(req,res)=>{
    try{
     const blogs=await Blogs.find()
     if(!blogs){
      return res.status(400).json({message:"blogs not found !"})
     }
     res.status(200).json(blogs)
    }
    catch(error){
      res.status(500).json({error:"Failed to get all blogs"})
    }
  }
  const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
  
      const blog = await Blogs.findById(id);
  
      if (!blog) {
        return res.status(404).json({ message: "Blog not found." });
      }
  
      // Extract the S3 key from the blogsImage URL
      const key = blog.blogsImage.split('/').slice(-2).join('/');
  
      // Delete the image from S3
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      };
  
      await s3.deleteObject(params).promise();
  
      // Delete the blog from the database
      await Blogs.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Blog deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const editBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, date } = req.body;
  
      // Find the blog by ID
      const blog = await Blogs.findById(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found." });
      }
  
      // If a new image is uploaded, update it on S3
      let blogsImage = blog.blogsImage;
      if (req.file) {
        // Delete the old image from S3
        const oldKey = blog.blogsImage.split('/').slice(-2).join('/');
        await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: oldKey }).promise();
  
        // Upload the new image to S3
        const newKey = `blogs/${uuidv4()}-${req.file.originalname}`;
        const uploadResult = await s3.upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: newKey,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        }).promise();
  
        blogsImage = uploadResult.Location;
      }
  
      // Update the blog details
      blog.title = title || blog.title;
      blog.description = description || blog.description;
      blog.date = date || blog.date;
      blog.blogsImage = blogsImage;
  
      await blog.save();
  
      res.status(200).json({ message: "Blog updated successfully.", blog });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

  export default {createBlog,getAllBlogs,deleteBlog,editBlog}