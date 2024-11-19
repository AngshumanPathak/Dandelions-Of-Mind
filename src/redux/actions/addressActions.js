import { SAVE_ORDER } from "../constatants/addressConstant";


export const saveOrder = (orderDetails) => {
 

    return {

        type: SAVE_ORDER,
        payload: orderDetails
    
    
    };


}
    
   