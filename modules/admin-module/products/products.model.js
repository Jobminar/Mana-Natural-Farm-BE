import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  productName: { 
    type: String, 
    required: true 
  },
  productImage: { 
    type: String, 
    required: true 
  },
  productTitle: { 
    type: String, 
    required: true 
  },
  productPrice: { 
    type: Number, 
    required: true 
  },
  CGST: { 
    type: Boolean, 
    default: false 
  },
  missCharges: { 
    type: Number, 
    default: 0 
  },
  SGST: { 
    type: Number, 
    default: 0 
  },
  handlingCharges: { 
    type: Number, 
    default: 0 
  },
  
  productSubTitle: { 
    type: String, 
    required: true 
  },
  productDescription: { 
    type: String, 
    required: true 
  },
  additionalFields: { 
    type: Map, 
    of: String 
  },
});

export default mongoose.model("Product", productSchema);
