const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register',[
    body('fullName').isLength({min: 3}).withMessage('fullName name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],
 userController.registerUser )

 router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],
userController.loginUser)

router.get('/profile',authMiddleware.authUser, userController.getUserProfile)
router.get('/logout',authMiddleware.authUser, userController.logoutUser)
router.put('/profile', authMiddleware.authUser, userController.updateProfile);


module.exports = router;
