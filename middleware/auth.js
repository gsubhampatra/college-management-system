// middleware/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

// Secret key for JWT (should be in an environment variable in a real application)
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateUser = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export const authorizeTeacher = (req, res, next) => {
  if (req.user.role !== 'Teacher') {
    return res.status(403).json({ message: 'Access denied. Teachers only.' });
  }
  next();
};