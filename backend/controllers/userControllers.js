const userModel = require('../models/User');
const userServices = require('../services/userSevice');
const {validationResult} = require('express-validator');


module.exports.registerUser= async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {fullName,email,password} = req.body;
    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({message:'User already exist'});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userServices.createUser({
        fullName,
        email,
        password:hashedPassword
    });
    //create token
    const token = user.generateAuthToken();
    res.status(201).json({token,user});
   // console.log('User registered successfully',user);

}
module.exports.loginUser = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    // console.log('Request Body:', req.body);
    const user = await userModel.findOne({email}).select('+password');
   // console.log('User Found:', user);
    if(!user){
        return res.status(401).json({message:'Invalid email'});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid  password'});
    }
    const token = user.generateAuthToken();
     res.cookie('token', token, {
    httpOnly: true,
    secure: true,         // Use HTTPS in production
    sameSite: 'None',     // Allows cookies from different origins
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });
    res.cookie('token', token);
     
     res.status(200).json({token,user});
     //console.log('User logged in successfully',user);
}
module.exports.getUserProfile = async (req, res,next) => {
     res.status(200).json(req.user);
}
module.exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  //res.redirect('/login'); // Adjust the path based on your frontend route
  res.status(200).json({ message: 'User logged out successfully' });
};

module.exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const user = await userModel.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fullName = updates.fullName || user.fullName;
    user.email = updates.email || user.email;

    if (updates.password) {
      user.password = await userModel.hashPassword(updates.password);
    }

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// This code handles user registration, login, profile retrieval, logout, and profile updates.