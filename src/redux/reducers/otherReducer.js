import * as actionTypes from '../constatants/otherConstants';


export const getOthersReducer = (state = {others: [] }, action) => {
    

    switch (action.type) {
        case actionTypes.GET_OTHERS_SUCCESS:
            return {
                others: action.payload
            };
    
        case  actionTypes.GET_OTHERS_FAIL:
                return{
                    error: action.payload
                };
        
        default: 
            return state;    
            }
   }


   export const getOtherDetailsReducer = (state =  {other: {} }, action) => { 
    switch (action.type) {
        case actionTypes.GET_OTHER_DETAILS_REQUEST:
            return {
                loading: true
            }
        case actionTypes.GET_OTHER_DETAILS_SUCCESS:
            return {
                loading: false, other: action.payload
            }
        case actionTypes.GET_OTHER_DETAILS_FAIL:
            return {
                loading:false, error: action.payload
            }
        case actionTypes.GET_OTHER_DETAILS_RESET:
            return {
                other: {}
            }
        default:
            return state;

    }
}

