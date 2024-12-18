import express from 'express';

import  faqController from './faq.controller.js'

const router = express.Router();

router.post('/', faqController.createFAQ);

router.get('/', faqController.getFAQs);

router.delete('/:id',faqController.deleteFAQ)


export default router;
