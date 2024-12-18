import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const itemSchema = new Schema({
  id: { type: String, required: true }, // product ID
  name: {
    shortTitle: { type: String, required: true },
    longTitle: { type: String, required: true }
  },
  price: {
    mrp: { type: Number, required: true },
    cost: { type: Number, required: true },
    discount: { type: String, required: true }
  },
  quantity: { type: Number, required: true },
  url: { type: String, required: true } // Image URL
});

const addressSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  house: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  pin: { type: String, required: true }
});

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User reference
  items: [itemSchema], // List of items in the order
  totalPrice: { type: Number, required: true }, // Total order price
  address: addressSchema, // Address for delivery
  transactionId: { type: String, required: true }, // Payment transaction ID
  orderId: { type: String, required: true }, // Unique order ID
  status: { type: String, default: 'pending' }, // Order status (optional)
  createdAt: { type: Date, default: Date.now } // Timestamp for order creation
});

const Order = model('Order', orderSchema);

export default Order;
