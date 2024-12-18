import express from 'express';
import multer from 'multer';
import certificateController from '../certificates/certificates.controller.js';

const router = express.Router();

// Set up multer storage
const storage = multer.memoryStorage();

const upload = multer({ storage }).single('certificateImage');

// Route to create a new certificate
router.post('/', upload, certificateController.createCertificate);

// Route to get all certificates
router.get('/', certificateController.getAllCertificates);

// Route to delete a certificate by ID
router.delete('/:id', certificateController.deleteCertificate);

export default router;
