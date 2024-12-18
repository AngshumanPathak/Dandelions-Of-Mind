import User from '../model/user-schema.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

export async function saveCart(req, res) {
  try {
    const userId = req.user.id; 
    const { cart } = req.body;

    if (!cart) {
      return res.status(400).json({ message: 'Cart data is required' });
    }

    
    const user = await User.findByIdAndUpdate(
      userId,
      { cart },
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Cart saved successfully', cart: user.cart });
  } catch (error) {
    console.error('Error saving cart:', error);
    res.status(500).json({ message: 'Error saving cart', error });
  }
}


export const getCartFromBackend = async (req, res) => {
    const userId = req.user.id; 
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      
      return res.status(200).json({ cart: user.cart });
    } catch (error) {
      console.error('Error fetching cart:', error);
      return res.status(500).json({ message: 'Error fetching cart', error });
    }
  };
