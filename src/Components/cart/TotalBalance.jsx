import { useState, useEffect } from "react"
import { Box, Typography,styled } from "@mui/material"
import useTotalBalance from "./hooks/totalBalance"


const Header = styled (Box)`

   padding: 15px 24px;
   background: #fff;
   border-bottom: 1px solid #f0f0f0;
   border-radius: 5px 5px 0 0;
`
const Heading = styled(Typography)`
    color: #878787;
`

const Container = styled(Box)`

    padding: 15px 24px;
    background: #fff;
    border-top : 2px solid #878787;
    

   & >p {

    margin-bottom: 20px;
   }

`

const Price = styled(Box)`

float: right;
`


const Diskcount = styled(Typography)`

color: green;
font-weight: 500;
font-size: 12px;
`





const TotalBalance = ({cartItems}) => {

    const { price, discount, deliveryCharges, totalPrice } = useTotalBalance({ cartItems });



    useEffect(() => {


    }, [price, discount, deliveryCharges, totalPrice]);
    return ( 
        <Box>
            <Header>
                <Typography>Price Details</Typography>
            </Header>
            <Container>
                <Typography>Price ({cartItems?.length} item)
                <Price component="span">₹ {price}</Price>
                </Typography>

                <Typography>Discount
                <Price component="span">₹ {discount}</Price>
                </Typography>

                <Typography>Delivery Price 
                <Price component="span">₹ {deliveryCharges}</Price>
                </Typography>

                <Typography variant ="h6" style={{borderTop : "2px solid #878787"}} >Total Price
                <Price component="span">₹ {totalPrice}</Price>
                </Typography>
                <Diskcount> **You will save ₹ {discount} on this order**</Diskcount>
                
            </Container>

            
        
        
        
        
        
        </Box>


        
    ) 
}

export default TotalBalance