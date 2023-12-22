


import MainPage from './Components/MainPage/mainPage';
import Home from './Components/MainPage/Home';
import {Box} from '@mui/material';
import DataProvider from './Context/DataProvider';

function App(){
  return (
    
    <DataProvider>
      <MainPage/>
      <Box style = {{marginTop: 54}} >
         <Home/>
      </Box>
    </DataProvider>
  );
}
  
      
      
      


export default App
