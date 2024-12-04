import express from "express";
import multer from "multer";
import productController from '../products/products.controller.js'

const router = express.Router();
const storage=multer.memoryStorage()
const upload=multer({storage}).single("productImage")

router.post("/", upload,productController.createProduct);

router.get("/", productController.getAllProducts);

router.get("/categoryId/:categoryId",productController.getCategoryProducts)

router.patch("/:id", upload,productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

export default router;
