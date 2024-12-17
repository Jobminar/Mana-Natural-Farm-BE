
import express from 'express';

import feedbackController from "./user.feedback.controller.js";

const router = express.Router();

router.post('/', feedbackController.createFeedback);

router.get('/', feedbackController.getAllFeedback);

router.get('/userId/:userId',feedbackController.getFeedbackByUserId)

router.delete('/:id',feedbackController.deleteFeedback)

export default router;
