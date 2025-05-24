const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a book title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please add an author name'],
    },
    description: {
      type: String,
      required: [true, 'Please add a book description'],
    },
    genre: {
      type: String,
      default: 'General',
    },
    coverImage: {
      type: String,
      default: 'https://via.placeholder.com/150', // optional fallback
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
