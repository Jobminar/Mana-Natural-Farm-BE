import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Category", categoriesSchema);
