const express = require('express');
const { body } = require('express-validator');
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/create',
  authMiddleware.authUser,
  [
    body('book').notEmpty().withMessage('Book ID is required'),
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('comment').notEmpty().withMessage('Comment is required'),
  ],
  reviewController.createReview
);
router.get('/:bookId', reviewController.getReviewsByBook);
module.exports = router;
