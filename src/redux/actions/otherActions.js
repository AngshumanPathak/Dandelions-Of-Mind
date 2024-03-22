import axios from 'axios';

import * as actiontypes from '../constatants/otherConstants'

const URL = "http://localhost:8000";





export const getOthers = () => async(dispatch) =>{
    try{

        const {data} = await axios.get(`${URL}/test/others`);
        dispatch ({type: actiontypes.GET_OTHERS_SUCCESS, payload: data});
    }
    catch(error){
        console.log('Error while calling getOthers API', error.message);
        dispatch ({type: actiontypes.GET_OTHERS_FAIL, payload: error.message});
    }
}


export const getOtherDetails = (id) => async(dispatch) =>{
    
    try{
      
       dispatch({type: actiontypes.GET_OTHER_DETAILS_REQUEST});

       const {data} = await axios.get(`${URL}/other/${id}`);
       
       dispatch ({type: actiontypes.GET_OTHER_DETAILS_SUCCESS, payload: data});
    }

    catch(error){
        dispatch ({type: actiontypes.GET_OTHER_DETAILS_FAIL, payload: error.message});

    }
    
}