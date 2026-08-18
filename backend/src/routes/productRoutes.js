import express from 'express';
import { getProducts, getProductById, addProduct, editProduct, deleteProduct } from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, authorize('admin'), addProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, authorize('admin'), editProduct)
  .delete(protect, authorize('admin'), deleteProduct);

export default router;
