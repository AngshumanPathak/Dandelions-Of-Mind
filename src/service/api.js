import axios from 'axios';




const URL = 'http://localhost:8000'


export const authenticateSignup = async(data) => {
    try{
        return await axios.post(`${URL}/signup`,data);
        
    }
    catch (error){
        
        console.log('Error while calling signup API', error);
        

    }
    
}


export const authenticateLogin = async(data) => {
    try{
        return await axios.post(`${URL}/login`,data);
        
    }
    catch (error){
        
        console.log('Error while calling login API', error);
        return error.response;
        

    }
    
}


export  const payUsingPaytm = async (data) => {
    try {
        let response = await axios.post(`${URL}/payment`, data);
        return response.data;
    } catch (error) {
        console.log('Error', error);
    }
}

export const saveOrder = async (finalOrderDetails) => {

  
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `${URL}/orderConfirmed`,
        finalOrderDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            
          },
        }
        
        
      );
      return response.data;
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };


  export const getOrders = async (token) => {

    try {

      const response = await axios.get(`${URL}/orders`, {

        headers : {

          Authorization: `Bearer ${token}`,
        },
      })

      return response.data;
    }

    catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  
  export const updateOrderStatus = async (_id, status) => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    try {
      console.log('Payload:', { _id, status });
      const response = await axios.patch(
        `${URL}/orders/${_id}/status`, // Use the _id for the route
        { status }, // Send the new status in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      return null;
    }
  };


  export const sendResetPasswordLink = async (email) => {
    try {
      const response = await axios.post(`${URL}/forgot-password`, { email });
      return response.data; // Return success response from the server
    } catch (error) {
      console.error('Error sending reset password link:', error);
  
      // Check if error.response exists to avoid accessing undefined
      if (error.response) {
        return error.response; // Return the error response from the server
      } else {
        return { message: 'Network error or request failed' }; // Handle network or unknown errors
      }
    }
  };
  


  export const resetUserPassword = async (token, newPassword, confirmPassword) => {
    try {
      const response = await axios.post(
        `${URL}/reset-password/${token}`,
        { newPassword, confirmPassword }
      );
      return response.data;  
    } catch (error) {
      console.error('Error resetting password:', error);
      return error.response;  
    }
  };
 
  export const saveCartToBackend = async () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
  
    if (!cart) {
      console.error("Cart not found in local storage");
      return;
    }
  
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error('User is not logged in');
      return;
    }
  
    try {
      const response = await axios.post(`${URL}/save-cart`, 
        { cart }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        }
      );
  
      if (response.data.message === 'Cart saved successfully') {
        console.log('Cart saved to the backend');
      } else {
        console.error('Error saving cart:', response.data);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  export const getCart = async () => {
    try {
     
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.error("User is not logged in, token is missing.");
        return;
      }
  
      
      const cartResponse = await axios.get(`${URL}/save-cart`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      
      if (cartResponse.data.cart) {
        
        localStorage.setItem('cart', JSON.stringify(cartResponse.data.cart));
        console.log('Cart fetched and saved to localStorage');
      } else {
        console.error('No cart data found in response');
      }
  
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  