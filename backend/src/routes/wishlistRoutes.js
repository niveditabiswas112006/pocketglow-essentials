import express from 'express';
import { getWishlist, toggleWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Protect all wishlist routes

router.route('/')
  .get(getWishlist)
  .post(toggleWishlist);

export default router;
