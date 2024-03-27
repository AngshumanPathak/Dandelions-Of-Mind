
import { Box, Button, styled } from "@mui/material";

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const LeftContainer = styled(Box)(({ theme }) => ({
    

    minWidth: 40,
    padding: '40px 0 0 80px',

    [theme.breakpoints.down('md')]: {
        padding: '20px 0 0 40px'
    }

}))


const Image = styled('img')`
    margin-bottom : 15px;
    width: 95%;
    border-radius : 10px;
`

const StyledButton = styled(Button)(({ theme }) => ({

    width : '47%',
    height: '50%',
    borderRadius : '10',
    marginLeft : '5px',
    backgroundColor : '#C04000',
 
    [theme.breakpoints.down('lg')]: {
     
     width: '44%'
 },
 
 [theme.breakpoints.down('md')]: {
     
     width: '47%'
 }
 }))
 
const ActionItemOther = ({other}) => {
   return (
       <LeftContainer>
           <Box styled={{ padding : "15px 20px", border: "1px solid #f0f0f0"}}>
             <Image src= {other.detailUrl} />
           </Box>
           
           <StyledButton variant="contained"><AddShoppingCartIcon />Add to Cart</StyledButton>
           <StyledButton variant="contained"><ShoppingBagIcon />Buy Now</StyledButton>

        </LeftContainer>
    );
};


export default ActionItemOther;