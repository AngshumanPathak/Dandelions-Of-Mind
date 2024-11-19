import { SAVE_ORDER } from "../constatants/addressConstant";

const initialState =  {
    
    
    orders: []
};

const orderReducer = (state = initialState, action) => {

    switch(action.type){

        case SAVE_ORDER :

         return {

                ...state, orders: [...state.orders, action.payload]
          };

          default: return state;
    }
}


   export default orderReducer;

