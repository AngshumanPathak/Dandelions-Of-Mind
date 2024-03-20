import axios from 'axios';

import * as actiontypes from '../constatants/productConstants'

const URL = "http://localhost:8000";

export const getProducts =() => async(dispatch) => {
    try {
       let {data} = await axios.get(`${URL}/test/products`);
       
       dispatch ({type: actiontypes.GET_PRODUCTS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: actiontypes.GET_PRODUCTS_FAIL, payload: error.message});
    }
}


export const getProductDetails = (id) => async(dispatch) => {
      
    try
    {
        dispatch({type: actiontypes.GET_PRODUCT_DETAILS_REQUEST});


        const {data} = await axios.get(`${URL}/product/${id}`);

        dispatch ({type: actiontypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data});
    }

    catch(error) {

        dispatch({type: actiontypes.GET_PRODUCT_DETAILS_FAIL, payload: error.message});
    }

}

export const getNameStands = () => async(dispatch) =>{
    try{

        let {data} = await axios.get(`${URL}/test/namestands`);
        dispatch ({type: actiontypes.GET_NAMESTANDS_SUCCESS, payload: data});
        

    }
    catch(error){
        console.log('Error while calling getNameStands API', error.message);
        dispatch ({type: actiontypes.GET_NAMESTANDS_FAIL, payload: error.message});
    }
}