const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

module.exports.authUser = async (req, res, next) => {
 
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log('TOKEN:', token);
    

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - User not found' });
    }

    req.user = user;
    next();

  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' })
       
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};
