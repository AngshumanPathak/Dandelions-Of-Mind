


import MainPage from './Components/MainPage/MainPage';
import Home from './Components/MainPage/Home/Home';
import DetailView from './Components/details/DetailView';
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
            </Routes>   
        </Box>
    </BrowserRouter>
  </DataProvider>
    
  );
}
  
      
      
      


export default App
