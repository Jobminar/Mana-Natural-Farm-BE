import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, // The title of the certificate (e.g., course name, award name)
    trim: true 
  },
  certificateImage: { 
    type: String, 
    required: true // The image URL or path of the certificate
  },
  issuer: { 
    type: String, 
    required: true, // The entity that issued the certificate (e.g., university, company)
    trim: true 
  },
  issuedDate: { 
    type: Date, 
    required: true, // The date when the certificate was issued
    default: Date.now
  }
});

export default mongoose.model("Certificate", certificateSchema);
