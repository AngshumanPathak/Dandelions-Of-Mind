
import { useState, useContext } from 'react';
import{Box, Button, styled, Typography} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


import { DataContext } from '../../Context/DataProvider';
import Profile from './Profile';

//components 

import LoginDialog from '../LoginSignUp/LoginDialog';


const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
margin: '0 3% 0 auto',
alignItems: 'center',
   [theme.breakpoints.down('md')]: {
     display: 'block'
   }
}))





const LoginButton = styled(Button)(({ theme }) => ({
  
  color: 'antiquewhite',
  background: 'grey',
  margin: '20px',
  textTransform: 'none',
  padding: '5px 20px',

  [theme.breakpoints.down('md')]: {
    color: 'grey',
    background: 'none',
    margin: 0,
    fontFamily: "Arial",
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.5',
    letterSpacing: '0.00938em'
  }

}))





const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    margin: '30px'
  }
}))


const CustomButtons = () => {

   const [open,setOpen] = useState(false);

   const {account, setAccount} = useContext(DataContext);
   const openDialog = () =>{
       setOpen(true);
   }
   
  

  return (
    <> <Wrapper>
          {
            account? <Profile account = {account} setAccount = {setAccount}/> : <LoginButton variant="container" onClick={()=> openDialog()}>Login</LoginButton>
          }
          
          <Container>
              <ShoppingCartIcon style={{marginTop: 5, color: 'grey'}}/>
              <Typography style ={{marginTop: 5,color: 'grey'}}>Cart</Typography>

          </Container>
          <LoginDialog open={open} setOpen={setOpen}/>
    </Wrapper>
          
          
      </>
  )
}

export default CustomButtons
