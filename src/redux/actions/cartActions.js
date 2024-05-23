import axios from 'axios';
import * as actiontypes from '../constatants/cartConstants';

const URL = "http://localhost:8000";


export const addToCart = (id, quantity) => async(dispatch) => {
     
    try{
        const productUrl = `${URL}/product/${id}`;
        const namestandUrl = `${URL}/namestand/${id}`;
        const otherUrl = `${URL}/other/${id}`;

        
        


        const requests = [
            axios.get(productUrl),
            axios.get(namestandUrl),
            axios.get(otherUrl)
        ];

        await axios.all(requests)
        .then(axios.spread((productResponse, namestandResponse, otherResponse) => {
            let data;
            if (productResponse.data) {
                data = productResponse.data;
            } else if (namestandResponse.data) {
                data = namestandResponse.data;
            } else if (otherResponse.data) {
                data = otherResponse.data;
            }

            if (!data) {
                throw new Error('No data found for the given ID');
            }

            dispatch({ type: actiontypes.ADD_TO_CART, payload: { ...data, quantity } });
        }))

    }

    catch(error){
         
        dispatch({type: actiontypes.ADD_TO_CART_ERROR, payload: error.message});
    }


}


export const removeFromCart = (id) => (dispatch) => {
    
   dispatch({type: actiontypes.REMOVE_FROM_CART, payload: id});
}