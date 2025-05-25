const { validationResult } = require('express-validator');
const Review = require('../models/Review');
const Book = require('../models/Book');

module.exports.createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { book, rating, comment } = req.body;

  try {
    const bookExists = await Book.findById(book);
    if (!bookExists) return res.status(404).json({ message: 'Book not found' });

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ book, user: req.user._id });
    if (existingReview)
      return res.status(400).json({ message: 'You have already reviewed this book' });

    const newReview = await Review.create({
      book,
      user: req.user._id,
      rating,
      comment,
    });

    res.status(201).json(newReview);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports.getReviewsByBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.find({ book: bookId })
      .populate('user', 'fullName') // optional: populate reviewer name
      .sort({ createdAt: -1 }); // latest reviews first

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this book' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error while fetching reviews' });
  }
};