import React, {useEffect, useState} from 'react';
import { Box, Typography, Grid, styled } from '@mui/material';
import { getOrders } from '../../service/api';

const OrderContainer = styled(Box)`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
`;

const OrderHeader = styled(Typography)`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
`;

const ItemImage = styled('img')`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const AddressBox = styled(Box)`
  font-size: 14px;
  line-height: 1.6;
`;

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchOrders = async () => {
          const data = await getOrders(token);
          setOrders(data);
        };
        fetchOrders();
      }, [token]);

      return (
        <div style={{ padding: '20px' }}>
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <Box>
              {orders.map((order) => (
                <OrderContainer key={order._id}>
                  {/* Order ID */}
                  <OrderHeader>Order ID: {order.orderId}</OrderHeader>
      
                  {/* Grid Layout */}
                  <Grid container spacing={2}>
                    {/* Left Section - Images and Names */}
                    <Grid item xs={12} md={4}>
                      {order.items.map((item) => (
                        <Box key={item.id} textAlign="center">
                          <ItemImage src={item.url} alt={item.name.shortTitle} />
                          <Typography>{item.name.shortTitle}</Typography>
                        </Box>
                      ))}
                    </Grid>
      
                    {/* Right Section - Address, Status, Total Price, Date */}
                    <Grid item xs={12} md={8}>
                      <AddressBox>
                        <Typography><strong>Address:</strong></Typography>
                        <Typography>{order.address.name}</Typography>
                        <Typography>{order.address.house}, {order.address.area}</Typography>
                        <Typography>{order.address.city}, {order.address.district}</Typography>
                        <Typography>PIN: {order.address.pin}</Typography>
                        <Typography>Phone: {order.address.phone}</Typography>
                      </AddressBox>
                      <Box marginTop={2}>
                        <Typography><strong>Status:</strong> {order.status}</Typography>
                        <Typography><strong>Total Price:</strong> ₹{order.totalPrice}</Typography>
                        <Typography><strong>Transaction ID:</strong> {order.transactionId}</Typography>
                        <Typography>
                          <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </OrderContainer>
              ))}
            </Box>
          )}
        </div>
      );
    }
      

export default Orders;
