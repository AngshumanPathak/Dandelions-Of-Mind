import React, { useState, useEffect } from "react";
import QRCode from 'qrcode';
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, CircularProgress, Button, TextField } from '@mui/material';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updatedOrderDetails } = location.state || {};
  
  if (!updatedOrderDetails) {
    return <div>Error: Order details not found. Please try again.</div>;
  }

  const { totalPrice, orderId } = updatedOrderDetails;
  const [qrCode, setQrCode] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isTransactionFieldVisible, setIsTransactionFieldVisible] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));  // Assuming JWT is stored in localStorage
  
  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if(!token){
      navigate('/')
    }
    else if (totalPrice > 0) {
      generateUPILink();
    } else  {
      console.error("Total price is zero or undefined");
    }
  }, [totalPrice]);

  const generateUPILink = async () => {
    const upiLink = `upi://pay?pa=pathakangshuman700-2@okaxis&pn=Angshuman Pathak&am=${totalPrice}&cu=INR&tn=Payment for Order ${orderId}`;
    const qrCode = await QRCode.toDataURL(upiLink);
    setQrCode(qrCode);
  };

  const handleConfirmPayment = () => {
    setIsTransactionFieldVisible(true);
  };

  const handleTransactionSubmit = async () => {
    if (!transactionId.trim()) {
      alert("Please enter a valid transaction ID.");
      return;
    }

    alert(`Transaction ID submitted: ${transactionId}`);

    const finalOrderDetails = {
      ...updatedOrderDetails, // This contains the items and address info
      transactionId, // Add transaction ID
    };
     

    

    navigate("/orderConfirmed", {state:{finalOrderDetails}});
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '20px', width: '300px', backgroundColor: 'grey.100', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>You are Paying: ₹{totalPrice}</Typography>
        <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
          {qrCode ? (
            <img src={qrCode} alt="QR Code for Payment" style={{ width: '100%', height: 'auto' }} />
          ) : (
            <CircularProgress />
          )}
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Pay to: pathakangshuman700-2@okaxis</Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: "20px" }} onClick={handleConfirmPayment}>Confirm Payment</Button>
        {isTransactionFieldVisible && (
          <Box sx={{ marginTop: "20px", width: "100%" }}>
            <TextField label="Transaction ID" variant="outlined" fullWidth value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
            <Button variant="contained" color="secondary" sx={{ marginTop: "10px" }} onClick={handleTransactionSubmit}>Submit Transaction ID</Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PaymentPage;
