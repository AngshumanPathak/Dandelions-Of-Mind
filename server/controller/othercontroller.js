import {Other} from "../model/product-schema.js";



export const getOthers = async(request,response) => {

    try{
        const others = await Other.find({});
  
  
        response.status(200).json(others);
    }
    
    catch(error){
  
      response.status(500).json({message: error.message});
  
  
    }
    
  }



  export const getOtherById = async(request,response) => {
    try{
      const id = request.params.id;
      const other = await Other.findOne({'id': id})
      
      response.status(200).json(other);
    }
    catch(error){
      response.status(500).json({message: error.message});
    }
}
  
