import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({


    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true}, 

    items: [
        {
          id: String,
          name: String,
          price: Number,
          url: String,
          quantity: Number,
        },
      ],
      totalPrice: { type: Number, required: true },
      address: {
        name: String,
        phone: String,
        house: String,
        area: String,
        city: String,
        district: String,
        pin: String,
      },
      orderDate: { type: Date, default: Date.now },
      
      
});


const Order = mongoose.model('Order', orderSchema);
model.exports = Order;

export {orderSchema};