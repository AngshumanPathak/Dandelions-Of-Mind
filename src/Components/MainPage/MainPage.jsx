import React from 'react'
import { AppBar, Toolbar, Box, styled, colors } from '@mui/material'
import { grey } from '@mui/material/colors'
import Search from './search'
import CustomButtons from './CustomButtons'


const StyledMainPage = styled(AppBar)`
background: #fa9d88;
height: 55px;

`
const MainLogo = styled('h3')({
  
  color: grey[700],
  fontStyle : 'italic'
})

const CustomButtonsWrapper = styled(Box)`
margin: 0 5% 0 auto;
`

const MainPage = () => {
  return (
    
        <StyledMainPage>
          <Toolbar style ={{minHeight: 55}} >
            <Box>
              <MainLogo>Dandelions Of Mind</MainLogo>
              
            </Box>
            
            <Search/>
            <CustomButtonsWrapper>
              <CustomButtons/>
            </CustomButtonsWrapper>
          </Toolbar>
          
          
        </StyledMainPage>
    
      
    
  )
}

export default MainPage
