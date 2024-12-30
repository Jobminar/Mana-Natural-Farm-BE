import Product from '../products/products.model.js';
import { v4 as uuidv4 } from "uuid";
import s3 from "../../../config/aws.s3.js";

// Create Product
const createProduct = async (req, res) => {
  try {
    const { 
      categoryId, 
      productName, 
      productTitle, 
      productPrice, 
      missCharges, 
      SGST, 
      handlingCharges, 
      deliveryCharges, 
      productSubTitle, 
      productDescription, 
      additionalFields 
    } = req.body;

    // Validate required fields
    if (!productName || !productTitle || !productSubTitle || !productDescription) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required!" });
    }

    // Upload Image to AWS S3
    const key = `product/${uuidv4()}-${req.file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const uploadImage = await s3.upload(params).promise();

    // Create Product
    const product = new Product({
      categoryId,
      productName,
      productImage: uploadImage.Location,
      productTitle,
      productPrice,
      missCharges: missCharges || 0,
      SGST: SGST || 0,
      handlingCharges: handlingCharges || 0,
      deliveryCharges: deliveryCharges || 0,
      productSubTitle,
      productDescription,
      additionalFields: additionalFields ? JSON.parse(additionalFields) : {},
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully!", product });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product", err: error.message });
  }
};

// Get Products by Category
const getCategoryProducts = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: "categoryId is required" });
    }

    const products = await Product.find({ categoryId })
      .populate('categoryId', 'categoryName'); // Adjust populate fields as needed

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for the given category" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products by category", err: error.message });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products", err: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      categoryId, 
      productName, 
      productTitle, 
      productPrice, 
      missCharges, 
      SGST, 
      handlingCharges, 
      deliveryCharges, 
      productSubTitle, 
      productDescription, 
      additionalFields 
    } = req.body;

    const updatedFields = {
      categoryId,
      productName,
      productTitle,
      productPrice,
      missCharges: missCharges || 0,
      SGST: SGST || 0,
      handlingCharges: handlingCharges || 0,
      deliveryCharges: deliveryCharges || 0,
      productSubTitle,
      productDescription,
      additionalFields: additionalFields ? JSON.parse(additionalFields) : {},
    };

    if (req.file) {
      const key = `product/${uuidv4()}-${req.file.originalname}`;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const uploadImage = await s3.upload(params).promise();
      updatedFields.productImage = uploadImage.Location;
    }

    const product = await Product.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product", err: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product", err: error.message });
  }
};

export default { createProduct, getAllProducts, updateProduct, deleteProduct, getCategoryProducts };
