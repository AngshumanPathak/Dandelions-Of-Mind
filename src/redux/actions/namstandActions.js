import axios from 'axios';

import * as actiontypes from '../constatants/namestandConstants'

const URL = "http://localhost:8000";



export const getNameStands = () => async(dispatch) =>{
    try{

        const {data} = await axios.get(`${URL}/test/namestands`);
        dispatch ({type: actiontypes.GET_NAMESTANDS_SUCCESS, payload: data});
        

    }
    catch(error){
        console.log('Error while calling getNameStands API', error.message);
        dispatch ({type: actiontypes.GET_NAMESTANDS_FAIL, payload: error.message});
    }
}


export const getNamestandDetails = (id) => async(dispatch) =>{
    
    try{
        
        dispatch({type: actiontypes.GET_NAMESTAND_DETAILS_REQUEST});

        const {data} = await axios.get(`${URL}/namestand/${id}`);

        dispatch ({type: actiontypes.GET_NAMESTAND_DETAILS_SUCCESS, payload: data});


    }
    catch (error){
        
        dispatch ({type: actiontypes.GET_NAMESTAND_DETAILS_FAIL, payload: error.message});

    }
}

