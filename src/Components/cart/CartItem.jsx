import { Box, Typography, styled, Button } from "@mui/material";
import { addEllipsis } from "../../utils/common-utils";
import ButtonGroup from "./ButtonGroup";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/cartActions";

const Container = styled(Box)`
border-top : 2px solid #878787;
display: flex;
background: white;

`

const LeftContainer = styled(Box)`
margin: 20px;


`

const RightContainer = styled(Box)`
margin: 20px;

`

const RemoveButton = styled(Button)`
background-color: white;

`


const CartItem = ({item}) => {
    

    const dispatch = useDispatch()
    const removeItemFromCart = (id) => {

        dispatch (removeFromCart(id))
    }


    return (

        <Container>
            <LeftContainer>
                <img src= {item.url} alt="Item Image" style={{height: 110, width: 110}}/>
                <ButtonGroup/>
            </LeftContainer>
            <RightContainer>
                <Typography style ={{fontSize: 16}}>{addEllipsis(item.title.longTitle)}</Typography>
                <Typography>
                        <Box component ="span" style={{fontSize: 30, fontWeight: 500}}>₹{item.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                        <Box component ="span" style ={{color: 'red'}}><strike> ₹{item.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                        <Box component ="span" style={{color: 'green'}}>{item.price.discount}</Box>

                    </Typography>
                <RemoveButton onClick={() => removeItemFromCart(item.id)}>Remove</RemoveButton>
            </RightContainer>
        </Container>
    )
}


export default CartItem;