import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});


const namestandSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});

const otherSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});


const Product = mongoose.model('product', productSchema);
const Namestand = mongoose.model('namestand', namestandSchema);
const Other = mongoose.model('other', otherSchema);


export {Product, Namestand, Other};
   

