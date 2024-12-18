import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, styled, Radio, RadioGroup, FormControlLabel, Button, FormControl } from '@mui/material';
import { getOrders, updateOrderStatus } from '../../service/api'; // Updated import


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

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [statusUpdates, setStatusUpdates] = useState({});
  const [editStatusOrderId, setEditStatusOrderId] = useState(null); // To track which order's status is being edited
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') {
        navigate('/'); // Redirect to login page if not logged in or not an admin
      }

    const fetchOrders = async () => {
      const data = await getOrders(token);
      setOrders(data);
    };
    fetchOrders();
  }, [token], [navigate]);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const saveStatus = async (orderId) => {
    const newStatus = statusUpdates[orderId];
    if (!newStatus) return;

    const updatedOrder = await updateOrderStatus(orderId, newStatus); // API call to update status

    if (updatedOrder) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setStatusUpdates((prev) => {
        const updated = { ...prev };
        delete updated[orderId];
        return updated;
      });
      setEditStatusOrderId(null); // Close the radio menu after saving
    }
  };

  const handleChangeButtonClick = (orderId) => {
    setEditStatusOrderId(orderId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Box>
          {orders.map((order) => (
            <OrderContainer key={order._id}>
              {/* Order ID and Transaction ID */}
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
                    <Typography>
                      <strong>Address:</strong>
                    </Typography>
                    <Typography>{order.address.name}</Typography>
                    <Typography>
                      {order.address.house}, {order.address.area}
                    </Typography>
                    <Typography>
                      {order.address.city}, {order.address.district}
                    </Typography>
                    <Typography>PIN: {order.address.pin}</Typography>
                    <Typography>Phone: {order.address.phone}</Typography>
                  </AddressBox>
                  <Box marginTop={2}>
                    <Typography>
                      <strong>Total Price:</strong> ₹{order.totalPrice}
                    </Typography>
                    <Typography><strong>Transaction ID:</strong> {order.transactionId}</Typography>

                    <Typography>
                      <strong>Order Date:</strong>{' '}
                      {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </Typography>

                    {/* Status Display with "Change" Button */}
                    <Box display="flex" alignItems="center">
                      <Typography><strong>Status:</strong> {order.status}</Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleChangeButtonClick(order._id)}
                        style={{ marginLeft: '10px' }}
                      >
                        Change
                      </Button>
                    </Box>

                    {/* Radio Buttons for Status Change */}
                    {editStatusOrderId === order._id && (
                      <Box marginTop={2}>
                        <FormControl component="fieldset" fullWidth margin="normal">
                          <RadioGroup
                            value={statusUpdates[order._id] || order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                          >
                            <FormControlLabel
                              value="Pending"
                              control={<Radio />}
                              label="Pending"
                            />
                            <FormControlLabel
                              value="Confirmed"
                              control={<Radio />}
                              label="Confirmed"
                            />
                            <FormControlLabel
                              value="Shipped"
                              control={<Radio />}
                              label="Shipped"
                            />
                            <FormControlLabel
                              value="Delivered"
                              control={<Radio />}
                              label="Delivered"
                            />
                          </RadioGroup>
                        </FormControl>

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => saveStatus(order._id)}
                          disabled={!statusUpdates[order._id]}
                        >
                          Save
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </OrderContainer>
          ))}
        </Box>
      )}
    </div>
  );
};

export default AdminDashboard;
