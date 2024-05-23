import { Box, Typography, styled } from "@mui/material";


const Component = styled(Box)`
height: 65vh;
width: 80%;
margin: 140px 140px;
background-color: white;
box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);




`

const Container = styled(Box)`
   text-align: center;
   padding: 70px;
   
   

`


const EmptyCart = () => {

 const imgUrl = "https://i.postimg.cc/jCVFHcPJ/Empty-Cart.png"


 

   
        
        

      return(
       
        <Component>
            <Container>
                <img src={imgUrl} style={{width: '15%'}}/>
                <Typography variant ="h5">Oops!! Your cart is empty</Typography>
            </Container>
        </Component>



      )


   

   

}

export default EmptyCart;