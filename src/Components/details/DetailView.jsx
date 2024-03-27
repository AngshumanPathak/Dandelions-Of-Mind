import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";

import { Box,  Typography, Grid, styled } from "@mui/material";

import ActionItem from "./ActionItem";
import LabelIcon from '@mui/icons-material/Label';


const Component = styled(Box)`
background : antiquewhite;
margin-top : 55px;
height: 100vh;

`

const Container = styled(Grid)(({ theme }) => ({

    background : 'antiquewhite',
    display: 'flex',
    
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}))
 




const RightContainer = styled(Grid)(({ theme }) => ({
 margintop : '50px',


[theme.breakpoints.down('md')]: {
    margin: '25px'
}
}))


const SmallText = styled(Box)`
font-size : 14px;
vertical-align : baseline;

& > p{
    font-size: 14px;
    margin-top : 10px;
}

`

const Badge = styled(LabelIcon)`
 margin-right : 10px;
 font-size: 15px;
`

const DetailView = () => {
    
    const dispatch = useDispatch();
    const {id} = useParams();
    
    const {loading,product} = useSelector(state => state.getProductDetails);
    console.log('getNamestandDetails slice:', { loading, product });

    
    
    console.log (product);
    
  
    useEffect (() => {
        if(product && id !== product.id)
        dispatch(getProductDetails(id));
        
        
    }, [dispatch, id, product,loading])
    
    return (
        <Component>
           {
                product &&Object.keys(product).length &&
                <Container container>
                    <Grid item lg={4} md={4} sm={8} xs={12}><ActionItem product={product}/></Grid>
                    
                    <RightContainer item lg={8} md={8} sm={8} xs={12}><Typography variant="h5">{product.title.longTitle}</Typography>
                    <Typography>
                        <Box component ="span" style={{fontSize: 30, fontWeight: 500}}>₹{product.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                        <Box component ="span" style ={{color: 'red'}}><strike> ₹{product.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                        <Box component ="span" style={{color: 'green'}}>{product.price.discount}</Box>

                    </Typography>
                    <SmallText>
                    <Typography>{product.description}</Typography>
                    <Typography><Badge/>Best priced</Typography>
                    <Typography><Badge/>No returns</Typography>
                    <Typography><Badge/>Shipping charges extra for out of station deliveries</Typography>
                    </SmallText>
                    

                    </RightContainer>
                    
                </Container>
           }

        </Component>
    )
}

export default DetailView;