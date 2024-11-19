

import {useContext, useEffect, useState} from 'react'
import { Box, Typography, Button, Grid, styled} from '@mui/material'
import {DataContext} from '../../Context/DataProvider'
import LoginDialog from '../LoginSignUp/LoginDialog'
import { useNavigate, useLocation } from 'react-router-dom'
import TotalBalance from '../cart/TotalBalance'
import { useDispatch } from 'react-redux'

const Container = styled(Box)`


background: white;
padding: 15px;
margin: 10%;


`

const Header = styled(Box)`
border-bottom : 2px solid #878787;

background: white;
padding: 10px;


`

const Details = styled(Box)`

padding: 5px
`

const InputContainer = styled(Box)`

 margin-top: 20px;
 margin-bottom: 20px;
 display: flex;
 justify-content: center;
 
 

`

const StyledInput = styled('input')`

width: 90%;
padding: 5px;
box-sizing: border-box;
background: transparent;
border: none; 
color: inherit;
outline: none;
font-size: 16px;
border-bottom : 2px solid #878787;

`

const StyledButton = styled(Button)`


margin- left: 100px;
color: antiquewhite;
background: grey;
width: 250px;
height: 50px;
`


const ButtonWrapper = styled(Box)`

text-align: center;

`








const Address = () => {

  
  const{isLoggedIn} = useContext(DataContext);
  const[showLoginPrompt, setShowLoginPrompt] = useState (false); 
  const[address,setAddress] = useState({
    name: '',
    phone: '',
    house: '',
    area: '',
    city: '',
    district: '',
    pin: '',
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const location = useLocation();
  const { orderDetails } = location.state || { orderDetails: [] };

 
  const handleChange = (e) => {

    const{name, value} = e.target
    if (name === 'phone' || name === 'pin'){

      if(!/^\d*$/.test(value)){

        return;
      }
    }
    setAddress({ ...address, [name]: value });
  };



  const validateInputs = () => {
    const { name, phone, house, area, city, district, pin } = address;
    if (!name || !phone || !house || !area || !city || !district || !pin) {
      alert('Please fill in all fields.');
      return false;
    }

    if (phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return false;
    }

    if (pin.length !== 6) {
      alert('Please enter a valid 6-digit PIN code.');
      return false;
    }

    return true;
  };


 const handleLoginClose = () => {
   
  setShowLoginPrompt(false)
 };


 const handleSubmit = async (e) => {
  e.preventDefault();


  if (!validateInputs()) {
    return; 
  }


  if (!isLoggedIn) {
    setShowLoginPrompt(true);
  } else {
      
     const finalOrderDetails = {

        ...orderDetails,address
     };

     dispatch(saveOrder(finalOrderDetails));
     console.log('Final Order Details:', finalOrderDetails);
  }


};

  return (
    <Container>
       <Header>
            <Typography>Enter Address Details</Typography>
       </Header>
       <Details>
            <InputContainer><StyledInput name = 'name' value = {address.name} placeholder='Enter Name' onChange={handleChange}/></InputContainer>

            <InputContainer><StyledInput name = 'phone' value = {address.phone} placeholder='Enter 10 digit Phone No.' type="tel" 
            pattern="\d{10}" 
            maxLength="10" onChange={handleChange} /></InputContainer>

            <InputContainer><StyledInput name = 'house' value = {address.house} placeholder='Enter House No. / Apartment No. / Building No.' onChange={handleChange}/></InputContainer>

            <InputContainer><StyledInput name = 'area' value = {address.area} placeholder='Enter Address (Area and Street)' onChange={handleChange}/></InputContainer>

            <InputContainer><StyledInput name = 'city' value = {address.city} placeholder='Enter City' onChange={handleChange}/></InputContainer>

            <InputContainer><StyledInput name = 'district' value = {address.district} placeholder='Enter District' onChange={handleChange}/></InputContainer>

            <InputContainer><StyledInput name = 'pin' value = {address.pin} placeholder='Enter 6 digit PIN' maxLength="6" onChange={handleChange}/></InputContainer>

            
       </Details>

       <ButtonWrapper>
         <StyledButton variant = "contained" onClick={handleSubmit}>Procced to Payment</StyledButton>
       </ButtonWrapper>

      <LoginDialog open={showLoginPrompt} setOpen={setShowLoginPrompt} />
             


    </Container>
  )
}

export default Address
