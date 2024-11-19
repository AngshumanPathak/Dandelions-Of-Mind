import mongoose from "mongoose";
import Address from "../model/address-schema.js";

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

     orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }]


});

const User = mongoose.model('User', userSchema);
export default User;