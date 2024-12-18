


import MainPage from './Components/MainPage/MainPage';
import Home from './Components/MainPage/Home/Home';
import DetailView from './Components/details/DetailView';
import DetailViewNamestand from './Components/details/DetailViewNamestand';
import DetailViewOther from './Components/details/DetailViewOther';
import Cart from './Components/cart/Cart'
import Address from './Components/Address/Address';
import PaymentPage from './Components/Payment/PaymentPage';
import Orders from './Components/Orders/Orders';
import {Box} from '@mui/material';
import DataProvider from './Context/DataProvider';
import { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import OrderConfirmed from './Components/OrderConfirmed/OrderConfirmed';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import ProtectedRoute from './Components/AdminDashboard/ProtectedRoute';
import SlidesFullView from './Components/MainPage/Home/SlidesFullView';
import Slides2FullView from './Components/MainPage/Home/Slides2FullView';
import Slides3FullView from './Components/MainPage/Home/Slides3FullView';
import LoginDialog from './Components/LoginSignUp/LoginDialog';

function App(){

    useEffect(() => {
        // Remove the token from localStorage on page load (refresh)
        localStorage.removeItem('authToken');
        
      }, );

  return (
  <DataProvider>
    <BrowserRouter>
        <MainPage/>
        <Box style = {{marginTop: '54px'}} >
            <Routes>
               <Route path = '/' element = {<Home/>}/>
               <Route path ='/product/:id' element = {<DetailView/>}/>
               <Route path='/namestand/:id' element = {<DetailViewNamestand/>}/>
               <Route path = '/other/:id' element = {<DetailViewOther/>}/>
               <Route path = '/cart' element = {<Cart/>}/>
               <Route path = '/address' element = {<Address/>}/>
               <Route path = '/payment' element = {<PaymentPage/>}/>
               <Route path = '/orderConfirmed' element = {<OrderConfirmed/>}/>
               <Route path = '/orders' element = {<Orders/>}/>
               <Route path = '/SlidesViewAll' element = {<SlidesFullView/>}/>
               <Route path = '/Slides2ViewAll' element = {<Slides2FullView/>}/>
               <Route path = '/Slides3ViewAll' element = {<Slides3FullView/>}/>
               <Route path="/reset-password/:token" element={<LoginDialog open={true} setOpen={() => {}} />} />
               
               
               <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                />
                
                
               
               
            </Routes>   
        </Box>
    </BrowserRouter>
  </DataProvider>
    
  );
}
  
      
      
      


export default App
