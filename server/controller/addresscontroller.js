import { response } from "express";
import { orderSchema } from "../model/order-schema";


router.post('/save',async(req,res) => {

  try {

    const orderData = req.body;
    const newOrder = new Order(orderData);


    await newOrder.save();

    res.status(201).json({ message: 'Order saved successfully' });

  }

  catch(error){
    
    res.status(500).json({ error: 'Failed to save order', details: error });
  }
})