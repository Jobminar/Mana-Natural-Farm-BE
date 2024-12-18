import express from 'express';
import contactusController from './contactus.controller.js';

const router = express.Router();

router.post("/",contactusController.createContactUs)

router.get('/', contactusController.getAllContactUs);

export default router;
