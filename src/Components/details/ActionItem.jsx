
import { Box, Button, styled } from "@mui/material";

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const LeftContainer = styled(Box)`
    min-width: 40%;
    padding: 40px 0 0 80px;
`;


const Image = styled('img')`
    margin-bottom : 15px;
    width: 95%;
    border-radius : 10px;
`

const StyledButton = styled(Button)`

   width : 47%;
   height: 50%;
   border-radius : 10px;
   margin-left : 5px;
   background-color : #C04000;
`

const ActionItem = ({product}) => {
   return (
       <LeftContainer>
           <Box styled={{ padding : "15px 20px", border: "1px solid #f0f0f0"}}>
             <Image src= {product.detailUrl} />
           </Box>
           
           <StyledButton variant="contained"><AddShoppingCartIcon />Add to Cart</StyledButton>
           <StyledButton variant="contained"><ShoppingBagIcon />Buy Now</StyledButton>

       </LeftContainer>
   )
}


export default ActionItem;