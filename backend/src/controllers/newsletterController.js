import Newsletter from '../models/Newsletter.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.statusCode = 400;
      return next(new Error('Please provide an email address'));
    }

    // Check if already subscribed
    const subscribed = await Newsletter.findOne({ email });
    if (subscribed) {
      res.status(200).json({
        success: true,
        message: 'You are already subscribed to our newsletter!',
      });
      return;
    }

    await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: 'Subscribed to newsletter successfully',
    });
  } catch (error) {
    next(error);
  }
};
