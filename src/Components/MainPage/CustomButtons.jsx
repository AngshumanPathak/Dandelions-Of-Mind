
import { useState, useContext } from 'react';
import{Box, Button, styled, Typography} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


import { DataContext } from '../../Context/DataProvider';
import Profile from './Profile';

//components 

import LoginDialog from '../LoginSignUp/LoginDialog';


const Wrapper = styled(Box)`
display: flex;
margin: 0 3% 0 auto;


`;

const LoginButton = styled(Button)`
color: antiquewhite;
background: grey;
margin: 20px ;
text-transform: none;
padding: 5px 20px;


`;

const Container = styled(Box)`
display: flex;
`

const CustomButtons = () => {

   const [open,setOpen] = useState(false);

   const {account, setAccount} = useContext(DataContext);
   const openDialog = () =>{
       setOpen(true);
   }

  return (
    <> <Wrapper style={{ display: 'flex', alignItems: 'center' }}>
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
