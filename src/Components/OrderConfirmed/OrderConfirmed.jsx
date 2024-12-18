
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Box, CircularProgress, Fade } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { saveCartToBackend, saveOrder } from '../../service/api';
import { cartReset } from '../../redux/actions/cartActions';

const OrderConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {finalOrderDetails} = location.state
  const orderSubmitted = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    
   
    if (finalOrderDetails && !orderSubmitted.current) {  
      
      orderSubmitted.current = true;
      saveOrder(finalOrderDetails)
        .then((response) => {
          console.log("Order saved successfully:", response);
          dispatch(cartReset());
          localStorage.removeItem('cart');
          saveCartToBackend();
          
        })
        .catch((error) => {
          console.error("Error saving order:", error);
        });
    } else if(!finalOrderDetails) {

      console.error("finalOrderDetails is undefined or null.");
      navigate("/");
    }
    
    const timer = setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 5000);
  
     // Cleanup the timer on unmount
     return () => clearTimeout(timer);

  }, [navigate, finalOrderDetails]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f0f8ff"
    >
      <Fade in={true} timeout={1000}>
        <CheckCircleIcon sx={{ fontSize: 100, color: 'green' }} />
      </Fade>
      <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
        Order Confirmed!
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        You will be redirected to the home page shortly...
      </Typography>
      <CircularProgress color="success" sx={{ mt: 4 }} />
    </Box>
  );
};

export default OrderConfirmed;
