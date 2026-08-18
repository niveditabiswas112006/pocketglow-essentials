import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');

    res.status(200).json({
      success: true,
      data: user.wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle wishlist item (add if not exists, remove if exists)
// @route   POST /api/wishlist
// @access  Private
export const toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;

    let product = await Product.findOne({ id: productId });
    if (!product && productId.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(productId);
    }

    if (!product) {
      res.statusCode = 404;
      return next(new Error('Product not found'));
    }

    const user = await User.findById(req.user.id);
    const exists = user.wishlist.includes(product._id);

    if (exists) {
      // Remove
      user.wishlist = user.wishlist.filter((id) => id.toString() !== product._id.toString());
    } else {
      // Add
      user.wishlist.push(product._id);
    }

    await user.save();
    const updatedUser = await User.findById(req.user.id).populate('wishlist');

    res.status(200).json({
      success: true,
      isWishlisted: !exists,
      data: updatedUser.wishlist,
    });
  } catch (error) {
    next(error);
  }
};
