


import MainPage from './Components/MainPage/MainPage';
import Home from './Components/MainPage/Home/Home';
import DetailView from './Components/details/DetailView';
import DetailViewNamestand from './Components/details/DetailViewNamestand';
import DetailViewOther from './Components/details/DetailViewOther';
import Cart from './Components/cart/cart';
import Address from './Components/Address/Address';
import {Box} from '@mui/material';
import DataProvider from './Context/DataProvider';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App(){
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
               
            </Routes>   
        </Box>
    </BrowserRouter>
  </DataProvider>
    
  );
}
  
      
      
      


export default App
