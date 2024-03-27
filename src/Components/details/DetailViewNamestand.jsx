import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNamestandDetails } from "../../redux/actions/namstandActions";


import { Box,  Typography, Grid, styled } from "@mui/material";
import ActionItemNamestand from "./ActionItemNamestand";
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












const DetailViewNamestand = () => {


    const dispatch =useDispatch ();

    const {id} = useParams();

    const {loading,namestand} = useSelector(state => state.getNamestandDetails);
    console.log('getNamestandDetails slice:', { loading, namestand});
    

    useEffect(() => {
        if (namestand && namestand.id !== id)
        dispatch (getNamestandDetails(id));
    }, [dispatch,id,namestand, loading])


    console.log(namestand);


    return (
       
            <Component>
               {
                    namestand && Object.keys(namestand).length  &&
                    <Container container>
                        <Grid item lg={4} md={4} sm={8} xs={12}><ActionItemNamestand namestand={namestand}/></Grid>
                        <RightContainer item lg={8} md={8} sm={8} xs={12}><Typography variant="h5">{namestand.title.longTitle}</Typography>
                        <Typography>
                            <Box component ="span" style={{fontSize: 30, fontWeight: 500}}>₹{namestand.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                            <Box component ="span" style ={{color: 'red'}}><strike> ₹{namestand.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                            <Box component ="span" style={{color: 'green'}}>{namestand.price.discount}</Box>
    
                        </Typography>
                        <SmallText>
                        <Typography>{namestand.description}</Typography>
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


export default DetailViewNamestand;