import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  landMark: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  orderNotes: { type: String, required: false },
});
export default mongoose.model("Address", addressSchema);
