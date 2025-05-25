const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

// const adminMiddleware = require('../middlewares/isAdminMiddleware');
// console.log('adminMiddleware:', typeof adminMiddleware);
//console.log('createBook handler:', bookController.createBook);
//console.log('authMiddleware:', typeof authMiddleware);

router.post(
  "/create",
  authMiddleware.authUser,
  // adminMiddleware,
  authMiddleware.isAdmin,
  ...[
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 2 })
      .withMessage("Title must be at least 2 characters long"),
    body("author").notEmpty().withMessage("Author is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("genre").optional().isString().withMessage("Genre must be a string"),
    body("coverImage")
      .optional()
      .isURL()
      .withMessage("Cover image must be a valid URL"),
    body("averageRating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Average rating must be between 0 and 5"),
  ],

  bookController.createBook
);
router.get('/all', bookController.getAllBooks);

router.get('/:id', bookController.getBookById);

module.exports = router;
