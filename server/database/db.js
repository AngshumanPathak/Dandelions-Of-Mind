
import mongoose from "mongoose";





export const Connection = async(username,password) =>{
    

    const URL =`mongodb+srv://${username}:${password}@ecommerce-web.vlnu1fj.mongodb.net/?retryWrites=true&w=majority`;

    try{
        await mongoose.connect(URL);
             console.log("Connection to Database successful")
    }
    catch(error){
    
        console.log("Error while connecting to database", error.message)
    }
}

export default Connection;