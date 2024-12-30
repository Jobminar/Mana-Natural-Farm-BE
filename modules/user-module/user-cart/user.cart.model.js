import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productName: { type: String, required: true },
        productImage: { type: String, required: true },
        productSubTitle: { type: String, required: true },
        productDescription: { type: String, required: false },
        productPrice: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);

