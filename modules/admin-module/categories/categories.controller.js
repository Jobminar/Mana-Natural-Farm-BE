import Category from "../categories/categories.model.js";
import { v4 as uuidv4 } from "uuid";
import s3 from "../../.././config/aws.s3.js";

const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({ message: "categoryName field is missing!" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image field is missing !" });
    }
    const key = `category/${uuidv4()}-${req.file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const uploadImage = await s3.upload(params).promise();
    const category = new Category({
      categoryName,
      image: uploadImage.Location,
    });
    await category.save();
    res.status(201).json({ message: "successfully added", category });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", err: error.message });
  }
};


const getAllCategory = async (req, res) => {
    try {
      const categories = await Category.find();
      if (categories.length === 0) {
        return res.status(200).json({ message: "No categories found", categories: [] });
      }
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to get categories", err: error.message });
    }
  };

export default {createCategory, getAllCategory};
