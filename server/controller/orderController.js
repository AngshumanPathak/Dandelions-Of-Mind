import Order from "../model/order-schema.js";
import mongoose from "mongoose";



export async function createOrder(req, res) {
 
  console.log('Received order details:', req.body);

  try {
    const { orderId, items, totalPrice, address, transactionId } = req.body;
    
    const userId = req.user.id; 
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const order = new Order({
      orderId,
      userId,
      items,
      totalPrice,
      address,
      transactionId
    });

    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export async function getOrders (req,res) {

  const {id:userId, role} = req.user;

  try {
    let orders;
     
      if(role === 'admin'){

        orders = await Order.find({});
      }
      else{
        orders = await Order.find({userId});
      }
    
    res.status(200).json(orders);
  }
  catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const updateOrderStatus = async (req, res) => {
  const { _id } = req.params; // Extract _id from route parameters
  const { status } = req.body; // Extract the status from the request body

  try {
    // Validate the new status
    const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).send({ message: 'Invalid status value' });
    }
    
    
    // Update the status in the database
    const updatedOrder = await Order.findByIdAndUpdate(
      _id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).send({ message: 'Order not found' });
    }

    res.send({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).send({ message: 'Error updating order status', error: error.message });
  }
};