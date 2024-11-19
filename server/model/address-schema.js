import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNo: {
        type: Number,
        required: true,
        trim: true
    },
    houseNo: {
        type: String,
        
        
    },
    locality: {
        type: String,
        required: true,
        trim: true

    },
    city: {

        type: String,
        required: true,
        
    },
    district: {
        type: String,
        required: true,
        trim: true
    },

    state: {
        type: String,
        required: true,
        trim: true
    },

    pin: {

        type: Number,
        required: true,
        trim: true
    },


    default: {
        type: Boolean,
        default: false
    }
});

const Address = mongoose.model('Address', addressSchema);
export default Address;
