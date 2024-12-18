import Certificate from '../certificates/certificates.model.js';
import s3 from '../../../config/aws.s3.js';
import { v4 as uuidv4 } from 'uuid'; 

const createCertificate = async (req, res) => {
  try {
    // Destructure fields from request body
    const { title, issuer } = req.body;

    // Validate required fields
    if (!title || !issuer) {
      return res.status(400).json({ message: "Title and issuer are required." });
    }

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    // Upload image to S3
    const key = `certificates/${uuidv4()}-${req.file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();

    // Create a certificate document
    const certificate = new Certificate({
      title, // Title from request body
      certificateImage: uploadResult.Location, // S3 URL of uploaded image
      issuer, // Issuer from request body
    });

    // Save the certificate to the database
    await certificate.save();

    res.status(201).json({ message: "Certificate created successfully", certificate });
  } catch (error) {
    res.status(500).json({ message: "Failed to create certificate.", error: error.message });
  }
};

const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();

    if (certificates.length === 0) {
      return res.status(404).json({ message: "No certificates found." });
    }

    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve certificates.", error: error.message });
  }
};

// Delete certificate by ID
const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the certificate by ID
    const certificate = await Certificate.findByIdAndDelete(id);

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found." });
    }

    res.status(200).json({ message: "Certificate deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete certificate.", error: error.message });
  }
};

export default { createCertificate, getAllCertificates, deleteCertificate };
