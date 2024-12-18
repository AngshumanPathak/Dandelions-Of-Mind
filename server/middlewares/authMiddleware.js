import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'


export const verifyToken = (req, res, next) => {

  dotenv.config();
  const token = req.headers.authorization.split(" ")[1]
  
  if (!token) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = decoded; 
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};


export const isAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from headers
  
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized. Please login.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key'); // Replace with your actual JWT secret
    const user = await user.findById(decoded._id); // Assuming you're storing user info in JWT

    if (!user) {
      return res.status(401).send({ message: 'Unauthorized. User not found.' });
    }

    // Check if the user is an admin
    if (user.role !== 'admin') {
      return res.status(403).send({ message: 'Access denied. Admins only.' });
    }

    // Proceed if user is authenticated and authorized
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send({ message: 'Invalid token.' });
  }
};
  