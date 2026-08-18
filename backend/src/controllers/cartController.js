import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.product');

    res.status(200).json({
      success: true,
      data: user.cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add or update item in cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check if product exists (either by mongoose ObjectId or custom string id)
    let product = await Product.findOne({ id: productId });
    if (!product && productId.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(productId);
    }

    if (!product) {
      res.statusCode = 404;
      return next(new Error('Product not found'));
    }

    const user = await User.findById(req.user.id);
    
    // Check if product is already in cart
    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === product._id.toString()
    );

    if (cartItemIndex > -1) {
      // Product exists, increment quantity
      user.cart[cartItemIndex].quantity += Number(quantity);
    } else {
      // Add new item
      user.cart.push({ product: product._id, quantity: Number(quantity) });
    }

    await user.save();
    
    const updatedUser = await User.findById(req.user.id).populate('cart.product');

    res.status(200).json({
      success: true,
      data: updatedUser.cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update quantity of cart item
// @route   PUT /api/cart/:productId
// @access  Private
export const updateQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || Number(quantity) < 1) {
      res.statusCode = 400;
      return next(new Error('Please provide a valid quantity >= 1'));
    }

    let product = await Product.findOne({ id: productId });
    if (!product && productId.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(productId);
    }

    if (!product) {
      res.statusCode = 404;
      return next(new Error('Product not found'));
    }

    const user = await User.findById(req.user.id);
    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === product._id.toString()
    );

    if (itemIndex === -1) {
      res.statusCode = 404;
      return next(new Error('Item not found in cart'));
    }

    user.cart[itemIndex].quantity = Number(quantity);
    await user.save();

    const updatedUser = await User.findById(req.user.id).populate('cart.product');

    res.status(200).json({
      success: true,
      data: updatedUser.cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    let product = await Product.findOne({ id: productId });
    if (!product && productId.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(productId);
    }

    if (!product) {
      res.statusCode = 404;
      return next(new Error('Product not found'));
    }

    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== product._id.toString()
    );

    await user.save();

    const updatedUser = await User.findById(req.user.id).populate('cart.product');

    res.status(200).json({
      success: true,
      data: updatedUser.cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear user cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();

    res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    next(error);
  }
};
