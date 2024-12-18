import axios from 'axios';
import * as actiontypes from '../constatants/cartConstants';

const URL = 'http://localhost:8000';

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const productUrl = `${URL}/product/${id}`;
    const namestandUrl = `${URL}/namestand/${id}`;
    const otherUrl = `${URL}/other/${id}`;

    const requests = [
      axios.get(productUrl),
      axios.get(namestandUrl),
      axios.get(otherUrl),
    ];

    await axios.all(requests).then(
      axios.spread((productResponse, namestandResponse, otherResponse) => {
        let data;
        if (productResponse.data) {
          data = productResponse.data;
        } else if (namestandResponse.data) {
          data = namestandResponse.data;
        } else if (otherResponse.data) {
          data = otherResponse.data;
        }

        if (!data) {
          throw new Error('No data found for the given ID');
        }

        dispatch({
          type: actiontypes.ADD_TO_CART,
          payload: { ...data, quantity },
        });

        // Save updated cart to localStorage
        const { cartItems } = getState().cart;
        saveCartToLocalStorage(cartItems);
      })
    );
  } catch (error) {
    dispatch({
      type: actiontypes.ADD_TO_CART_ERROR,
      payload: error.message,
    });
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actiontypes.REMOVE_FROM_CART,
    payload: id,
  });

  // Save updated cart to localStorage
  const { cartItems } = getState().cart;
  saveCartToLocalStorage(cartItems);
};

export const updateCartQuantity = (id, quantity) => (dispatch, getState) => {
  try {
    dispatch({
      type: actiontypes.UPDATE_CART_QUANTITY,
      payload: { id, quantity },
    });

    // Save updated cart to localStorage
    const { cartItems } = getState().cart;
    saveCartToLocalStorage(cartItems);
  } catch (error) {
    dispatch({
      type: actiontypes.CART_UPDATE_ERROR,
      payload: error.message,
    });
  }
};

export const cartReset = () => (dispatch) => {
  dispatch({
    type: actiontypes.CART_RESET,
  });

  // Clear cart from localStorage
  localStorage.removeItem('cart');
};

export const setCartItems = (items) => {
  console.log('Dispatching SET_CART_ITEMS action with items:', items);
  return {
    type: actiontypes.SET_CART_ITEMS,
    payload: items,
  };
};
