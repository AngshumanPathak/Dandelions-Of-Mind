import { products, namestands, other } from "./constants/data.js";
import {Product, Namestand, Other} from "./model/product-schema.js";



const DefaultData = async()=>{
    try{
        await Product.insertMany(products);
        console.log("Data imported successfully");


        await Namestand.insertMany(namestands);
        console.log("Namestand imported successfully");
        

        await Other.insertMany(other);
        console.log("Other imported successfully");


        

        
    }
    catch(error){
        console.log("Error while inserting default data",error.message)
    }

}


export default DefaultData;