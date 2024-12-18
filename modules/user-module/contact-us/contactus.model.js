import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address.'] 
  },
  subject: { 
    type: String, 
    required: true, 
    trim: true 
  },
  message: { 
    type: String, 
    required: true, 
    minlength: 10 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("ContactUs", contactUsSchema);
