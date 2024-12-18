
import { useState, useContext } from 'react';
import{Box, Button, styled, Typography, Badge} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useSelector } from 'react-redux';


import { DataContext } from '../../Context/DataProvider';
import Profile from './Profile';

//components 

import LoginDialog from '../LoginSignUp/LoginDialog';
import { Link } from 'react-router-dom';


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





const Container = styled(Link)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    margin: '30px'
  }
}))


const CustomButtons = () => {

   const [open,setOpen] = useState(false);

  

   const {account, setAccount, isLoggedIn, setIsLoggedIn} = useContext(DataContext);
   const openDialog = () =>{
       setOpen(true);
   }
   

   const {cartItems} = useSelector(state => state.cart);
  

  return (
    <> <Wrapper>
          {isLoggedIn ? (
          <Profile account={account} setAccount={setAccount} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginButton variant="container" onClick={openDialog}>
            Login
          </LoginButton>
        )}
          
          <Container to = "/cart">
              <Badge badgeContent={cartItems?.length} color="primary">
                 <ShoppingCartIcon style={{marginTop: 5, color: 'grey'}}/>
              </Badge>
              
              <Typography style ={{marginTop: 5,color: 'grey'}}>Cart</Typography>

          </Container>
          <LoginDialog open={open} setOpen={setOpen}/>
    </Wrapper>
          
          
      </>
  )
}

export default CustomButtons
