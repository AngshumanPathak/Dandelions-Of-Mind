





import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Typography, Button,Divider, styled } from "@mui/material";
import { Link } from "react-router-dom";


const Component = styled(Box)`
 margin-top: 10px;
 font-color: #e47911;
`

const Deal = styled (Box)`
padding: 15px 20px;
display: flex;
`

const DealText = styled(Typography)` 
font-size: 22px;
font-weight: 600;
color: #616161;


`

const ViewAllButton = styled(Button)`

  margin-left: auto;
  background: #2874f0;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  color: antiquewhite;
  background-color: gray;

  &:hover {
    background-color: #d8b4ba};
`
const Image = styled('img')({
  width: 'auto',
  height: 150
})

const Text = styled(Typography)`
font-size: 14px;
margin-top: 5px;
`

const responsive = {
    
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
}

const Slide2 = ({namestands}) => {

    return (

    <Component>
      <Deal>
         <DealText>Name Stands</DealText>
         <ViewAllButton variant = "contained">
           View All
         </ViewAllButton>
      </Deal>
      <Divider/>
       
       <Carousel 
       swipeable={false}
       draggable={false}
       infinite={true}
       autoPlay={true}
       autoPlaySpeed={4000}
       keyBoardControl={true}
       centerMode={true}
    
        responsive={responsive}
        >
            {
                namestands.map(namestand =>(
                  <Link to = {`namestand/${namestand.id}`} style = {{textDecoration: "none"}}>
                    <Box textAlign= "center" style ={{padding: "25px 15px"}}>
                         <Image src= {namestand.url} alt = "product"/>
                         <Text>{namestand.title.shortTitle}</Text>
                         
                    </Box>
                  </Link>
                    
                    
                ))
            }
    </Carousel>
    </Component>
    
    
    
        
       
    )

}

export default Slide2;