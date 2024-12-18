import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        max: 20,
        min: 5,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type:String,
        required: true
     },
     role: {
        type: String,
        default: 'user', 
      },

     resetPasswordToken: {
        type: String
     },

     resetPasswordExpires: {
        type: Date
     },

     cart: {
      type: Array, 
      default: [], 
    },

     orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],

});

const User = mongoose.model('User', userSchema);
export default User;