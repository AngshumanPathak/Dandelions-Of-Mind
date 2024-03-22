import {Namestand} from "../model/product-schema.js";



export const getNameStands = async(request,response) => {

    try{
        const namestands = await Namestand.find({});
  
  
        response.status(200).json(namestands);
    }
    
    catch(error){
  
      response.status(500).json({message: error.message});
  
  
    }
    
  }
  

  export const getNamestandById = async(request,response) => {
    try{
      const id = request.params.id;
      const namestand = await Namestand.findOne({'id': id})
      
      response.status(200).json(namestand);
    }
    catch(error){
      response.status(500).json({message: error.message});
    }
}