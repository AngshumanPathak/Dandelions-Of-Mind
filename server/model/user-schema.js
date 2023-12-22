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
     }



});

const User = mongoose.model('user', userSchema);
export default User;