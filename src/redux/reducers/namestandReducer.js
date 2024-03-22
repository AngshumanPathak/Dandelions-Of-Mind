
import * as actionTypes from '../constatants/namestandConstants';





export const getNameStandsReducer = (state = {nameStands: [] }, action) => {

    switch (action.type) {
        case actionTypes.GET_NAMESTANDS_SUCCESS:
            return {
                nameStands: action.payload
            };
    
        case  actionTypes.GET_NAMESTANDS_FAIL:
                return{
                    error: action.payload
                };
        
        default: 
            return state;    
            }
    }


    export const getNamestandDetailsReducer = (state =  {namestand: {} }, action) => { 
        switch (action.type) {
            case actionTypes.GET_NAMESTAND_DETAILS_REQUEST:
                return {
                    loading: true
                }
            case actionTypes.GET_NAMESTAND_DETAILS_SUCCESS:
                return {
                    loading: false, namestand: action.payload
                }
            case actionTypes.GET_NAMESTAND_DETAILS_FAIL:
                return {
                    loading:false, error: action.payload
                }
            case actionTypes.GET_NAMESTAND_DETAILS_RESET:
                return {
                    namestand: {}
                }
            default:
                return state;
    
        }
    }


    