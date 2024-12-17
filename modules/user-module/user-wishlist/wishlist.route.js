import express from 'express';

import wishlistController from './wishlist.controller.js';

const router = express.Router();

router.post("/",wishlistController.createWishlist)

router.get('/:userId', wishlistController.getWishlist);

router.delete('/:id', wishlistController.deleteWishlist);

export default router;
