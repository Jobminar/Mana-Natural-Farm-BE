import mongoose from "mongoose";

const bannersSchema = new mongoose.Schema({
  bannerName: { type: String, required: true },

  image: { type: String, required: true },
});
export default mongoose.model("Banners", bannersSchema);
