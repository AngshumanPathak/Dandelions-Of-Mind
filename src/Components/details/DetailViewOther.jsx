import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOtherDetails } from "../../redux/actions/otherActions";

import { Box,  Typography, Grid, styled } from "@mui/material";
import ActionItemOther from "./ActionItemOther";
import LabelIcon from '@mui/icons-material/Label';


const Component = styled(Box)`
background : antiquewhite;
margin-top : 55px;

`

const Container = styled(Grid)`
 background : antiquewhite;
 display: flex;
 height: 100vh;


`

const RightContainer = styled(Grid)`
 margin-top : 50px;
 
`

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

const DetailViewOther = () => {
    
    const dispatch = useDispatch();
    const {id} = useParams();
    
    const {loading,other} = useSelector(state => state.getOtherDetails);

    
    
    console.log (other);
    
  
    useEffect (() => {
        if(other && id !== other.id)
        dispatch(getOtherDetails(id));
        
        
    }, [dispatch, id, other,loading])
    
    return (
        <Component>
           {
                other &&Object.keys(other).length &&
                <Container container>
                    <Grid item lg={4} md={4} sm={8} xs={12}><ActionItemOther other={other}/></Grid>
                    <RightContainer item lg={8} md={8} sm={8} xs={12}><Typography variant="h5">{other.title.longTitle}</Typography>
                    <Typography>
                        <Box component ="span" style={{fontSize: 30, fontWeight: 500}}>₹{other.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                        <Box component ="span" style ={{color: 'red'}}><strike> ₹{other.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                        <Box component ="span" style={{color: 'green'}}>{other.price.discount}</Box>

                    </Typography>
                    <SmallText>
                    <Typography>{other.description}</Typography>
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

export default DetailViewOther;