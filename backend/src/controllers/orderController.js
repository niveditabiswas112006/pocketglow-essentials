import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const { address, items } = req.body;

    if (!items || items.length === 0) {
      res.statusCode = 400;
      return next(new Error('Please add items to your order'));
    }

    if (!address) {
      res.statusCode = 400;
      return next(new Error('Please provide shipping address'));
    }

    let subtotal = 0;
    const orderItems = [];

    // Verify products and build order items
    for (const item of items) {
      let product = await Product.findOne({ id: item.productId });
      if (!product && item.productId.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(item.productId);
      }

      if (!product) {
        res.statusCode = 404;
        return next(new Error(`Product not found with id: ${item.productId}`));
      }

      const price = product.price;
      const quantity = Number(item.quantity);
      subtotal += price * quantity;

      orderItems.push({
        product: product._id,
        quantity,
        price,
      });
    }

    // Shipping fee rule: Free above 999, else 79
    const shipping = subtotal >= 999 ? 0 : 79;
    const total = subtotal + shipping;

    // Create the order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      subtotal,
      shipping,
      total,
      address,
      paymentStatus: 'paid', // Mark as paid for simplicity in demo
    });

    // Clear user cart
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/all
// @access  Private/Admin
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
