import {React, useState} from 'react'

import { AppBar, Toolbar, Box, styled, Drawer, IconButton, List, ListItem } from '@mui/material'
import { grey } from '@mui/material/colors'
import Search from './search'
import CustomButtons from './CustomButtons'
import { Link } from 'react-router-dom'
import {Menu} from '@mui/icons-material';


const StyledMainPage = styled(AppBar)`
background: #fa9d88;
height: 55px;

`
const MainLogo = styled('h3')({
  
  color: grey[700],
  fontStyle : 'italic'
})

const CustomButtonsWrapper = styled(Box) (({ theme }) => ({
  margin: '0 5% 0 auto',

  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))
const MenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  }
}))





const MainPage = () => {
  const [open, setOpen] = useState(true);

const handleOpen = () => {
  setOpen(true);
}

const handleClose = () => {
  setOpen(false);
}


const list = () => (
  <Box>
    <List>
      <ListItem>
        <CustomButtons/>
      </ListItem>
    </List>
  </Box>
)


  return (
    
        <StyledMainPage>
          <Toolbar style ={{minHeight: 55}} >
            <MenuButton aria-label='delete'>
                <Menu color='inherit' onClick = {handleOpen}/>
            </MenuButton>
            <Drawer  open={open} onClose={handleClose}>
              {list()}
            </Drawer>
            <Link to = '/' style ={{textDecoration: 'none'}}>
            <Box>
              <MainLogo>Dandelions Of Mind</MainLogo>
              
            </Box>
            </Link>
            
            <Search/>
            <CustomButtonsWrapper>
              <CustomButtons/>
            </CustomButtonsWrapper>
          </Toolbar>
          
          
        </StyledMainPage>
    
      
    
  )
}

export default MainPage
