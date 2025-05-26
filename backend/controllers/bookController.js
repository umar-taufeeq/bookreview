const { validationResult } = require('express-validator');
const Book = require('../models/Book.js');

module.exports.createBook = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, author, description, genre, coverImage, averageRating } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      genre,
      coverImage,
      averageRating,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);

  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Server error while creating book' });
  }
};
// module.exports.getAllBooks = async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     const skip = (page - 1) * limit;
//     const totalBooks = await Book.countDocuments();
//     const books = await Book.find().skip(skip).limit(limit).sort({ createdAt: -1 });

//     res.status(200).json({
//       totalBooks,
//       totalPages: Math.ceil(totalBooks / limit),
//       currentPage: page,
//       books,
//     });
//   } catch (error) {
//     console.error('Error fetching books:', error);
//     res.status(500).json({ message: 'Server error while fetching books' });
//   }
// };
module.exports.getAllBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const genre = req.query.genre || '';

  try {
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (search) {
  const searchRegex = new RegExp(search.split(' ').join('|'), 'i');
  query.$or = [
    { title: { $regex: searchRegex } },
    { author: { $regex: searchRegex } },
  ];
}

    if (genre) {
      query.genre= genre; // exact match category filter
    }

    const totalBooks = await Book.countDocuments(query);
    const books = await Book.find(query)
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
      books,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error while fetching books' });
  }
};
module.exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);

  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ message: 'Server error while fetching book' });
  }
};