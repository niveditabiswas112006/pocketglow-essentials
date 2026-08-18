import express from 'express';
import { createOrder, getUserOrders, getAllOrders } from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Protect all order routes

router.route('/')
  .post(createOrder)
  .get(getUserOrders);

router.get('/all', authorize('admin'), getAllOrders);

export default router;
