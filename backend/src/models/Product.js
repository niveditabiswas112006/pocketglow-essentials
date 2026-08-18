import mongoose from 'mongoose';

const ProductImageSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
  },
  tagline: {
    type: String,
    required: [true, 'Please add a tagline'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  category: {
    type: String,
    required: [true, 'Please add a primary category'],
    enum: ['skin', 'lip', 'kits', 'bestsellers'],
  },
  categories: [
    {
      type: String,
      enum: ['skin', 'lip', 'kits', 'bestsellers'],
    },
  ],
  badge: {
    type: String,
    trim: true,
  },
  benefits: [
    {
      type: String,
    },
  ],
  howToUse: [
    {
      type: String,
    },
  ],
  ingredients: {
    type: String,
    required: [true, 'Please add ingredients'],
  },
  images: [ProductImageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', ProductSchema);
