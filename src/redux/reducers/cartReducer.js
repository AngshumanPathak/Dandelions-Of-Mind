import * as actionType from '../constatants/cartConstants';


const calculateTotal = (cartItems) =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


export const cartReducer = (state = {cartItems: []},action) => {

    switch (action.type){

        case actionType.ADD_TO_CART:
            const item = action.payload;
            const exist = state.cartItems.find(product => product.id === item.id);



        if (exist){
            return {
                ...state,
          cartItems: state.cartItems.map((data) =>
            data.id === exist.id ? item : data
          ),
          totalAmount: calculateTotal(
            state.cartItems.map((data) =>
              data.id === exist.id ? item : data
            )
          ),
            }
            }
        else {
            const updatedCart = [...state.cartItems, item];
            return {
              ...state,
              cartItems: updatedCart,
              totalAmount: calculateTotal(updatedCart),
            };
        }


        case actionType.REMOVE_FROM_CART:
            const filteredCart = state.cartItems.filter(
                (product) => product.id !== action.payload
              );
              return {
                ...state,
                cartItems: filteredCart,
                totalAmount: calculateTotal(filteredCart),
              };

        
         case actionType.UPDATE_CART_QUANTITY:
                const updatedCart = state.cartItems.map((product) =>
                  product.id === action.payload.id
                    ? { ...product, quantity: Math.max(1, action.payload.quantity) }
                    : product
                );
                return {
                  ...state,
                  cartItems: updatedCart,
                  totalAmount: calculateTotal(updatedCart),
                };
          

        default : return state;
    }
}



