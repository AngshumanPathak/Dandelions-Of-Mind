import { useState, useEffect } from "react"
import { Box, Typography,styled } from "@mui/material"


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

    
    const[price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);


    useEffect(() => {
        totalAmount();
    }, [cartItems])


    const totalAmount =() =>{

        let price = 0 , discount = 0;
        cartItems.map(item => {
           price += item.price.mrp;
           discount += (item.price.mrp - item.price.cost);
    
    
    
        });

        setPrice(price);
        setDiscount(discount);


    }

    
    


    
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
                <Price component="span">₹ 40</Price>
                </Typography>

                <Typography variant ="h6" style={{borderTop : "2px solid #878787"}} >Total Price
                <Price component="span">₹ {price - discount + 40}</Price>
                </Typography>
                <Diskcount> **You will save ₹ {discount} on this order**</Diskcount>
                
            </Container>

            
        
        
        
        
        
        </Box>


        
    )
}

export default TotalBalance