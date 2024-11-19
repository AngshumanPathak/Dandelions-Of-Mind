import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {getProductReducer, getProductDetailsReducer} from './reducers/productReducer';
import {getOthersReducer, getOtherDetailsReducer} from './reducers/otherReducer';
import {getNameStandsReducer,getNamestandDetailsReducer } from './reducers/namestandReducer';
import {cartReducer} from './reducers/cartReducer';
import orderReducer from './reducers/addressReducer';

const reducer = combineReducers({
    getProducts : getProductReducer,
    getNameStands : getNameStandsReducer,
    getOthers : getOthersReducer,
    getProductDetails : getProductDetailsReducer,
    getNamestandDetails : getNamestandDetailsReducer,
    getOtherDetails: getOtherDetailsReducer,
    cart: cartReducer ,
    orders: orderReducer
    
    
})

const middleware = [thunk];

const store = createStore(
   reducer,
   
   composeWithDevTools(applyMiddleware(...middleware))
)

export default store;