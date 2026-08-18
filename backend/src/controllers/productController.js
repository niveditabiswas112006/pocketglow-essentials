import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = {};
    
    if (category) {
      // Find where category matches or is in categories array
      query = { 
        $or: [
          { category: category },
          { categories: category }
        ]
      };
    }

    const products = await Product.find(query);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // First, search by custom string id (e.g. 'glow-serum-sachet')
    let product = await Product.findOne({ id: id });

    // Fallback: search by mongoose ObjectId if length matches ObjectId pattern
    if (!product && id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }

    if (!product) {
      res.statusCode = 404;
      return next(new Error(`Product not found with id or key of ${id}`));
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add product
// @route   POST /api/products
// @access  Private/Admin
export const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Edit product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product = await Product.findOne({ id: id });

    if (!product && id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }

    if (!product) {
      res.statusCode = 404;
      return next(new Error(`Product not found with id or key of ${id}`));
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(product._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product = await Product.findOne({ id: id });

    if (!product && id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }

    if (!product) {
      res.statusCode = 404;
      return next(new Error(`Product not found with id or key of ${id}`));
    }

    await Product.findByIdAndDelete(product._id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
