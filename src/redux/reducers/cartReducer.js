import * as actionType from '../constatants/cartConstants';

// Helper function to calculate the total amount
const calculateTotal = (cartItems) =>
  cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

export const cartReducer = (state = { cartItems: [], totalAmount: 0 }, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      const item = action.payload;
      const exist = state.cartItems.find((product) => product.id === item.id);

      if (exist) {
        // Update existing cart item
        const updatedCart = state.cartItems.map((data) =>
          data.id === exist.id ? { ...data, quantity: data.quantity + item.quantity } : data
        );
        return {
          ...state,
          cartItems: updatedCart,
          totalAmount: calculateTotal(updatedCart),  // Recalculate total
        };
      } else {
        // Add new item to cart
        const updatedCart = [...state.cartItems, item];
        return {
          ...state,
          cartItems: updatedCart,
          totalAmount: calculateTotal(updatedCart),  
        };
      }

    case actionType.SET_CART_ITEMS:
      console.log('Handling SET_CART_ITEMS in reducer:', action.payload); 
      return {
        ...state,
        cartItems: action.payload,
        totalAmount: calculateTotal(action.payload),  
      };

    case actionType.REMOVE_FROM_CART:
      const filteredCart = state.cartItems.filter((product) => product.id !== action.payload);
      return {
        ...state,
        cartItems: filteredCart,
        totalAmount: calculateTotal(filteredCart),  // Recalculate total
      };

    case actionType.UPDATE_CART_QUANTITY:
      const updatedQuantityCart = state.cartItems.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: Math.max(1, action.payload.quantity) } // Ensure quantity is at least 1
          : product
      );
      return {
        ...state,
        cartItems: updatedQuantityCart,
        totalAmount: calculateTotal(updatedQuantityCart),  // Recalculate total
      };

    case actionType.CART_RESET:
      return {
        ...state,
        cartItems: [],
        totalAmount: 0,  // Reset total amount as well
      };

    default:
      return state;
  }
};
