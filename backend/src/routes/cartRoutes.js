import express from 'express';
import { getCart, addToCart, updateQuantity, removeCartItem, clearCart } from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Protect all cart routes

router.route('/')
  .get(getCart)
  .post(addToCart)
  .delete(clearCart);

router.route('/:productId')
  .put(updateQuantity)
  .delete(removeCartItem);

export default router;
