const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();
module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized - Missing token'});
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    console.error('Invalid format or missing token in the Authorization header.');
    return res.status(401).json({ message: 'Unauthorized - Missing token'});
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.error('User not found for the given token.');
      return res.status(401).json({ message: 'Unauthorized - User not found' });
    }
    req.user = user;
    console.log('Token is valid.');
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired.');
      return res.status(401).json({ message: 'Unauthorized - Token expired' });
    }
    console.error('Invalid token.');
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};
