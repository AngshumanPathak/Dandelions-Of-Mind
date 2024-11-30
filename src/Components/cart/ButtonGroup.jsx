import { Box, Button, ButtonGroup, styled } from "@mui/material";




const Component = styled(ButtonGroup)`

margin-top: 10px;
`
const StyledButton = styled(Button)`

border-radius: 50px;
`


const GroupedButton = ({count, onIncrease, onDecrease}) => {

 
    return (
     
      <Component>
        <StyledButton onClick={onDecrease} disabled={count <= 1}>-</StyledButton>
        <Button disabled>{count}</Button>
        <StyledButton onClick={onIncrease}>+</StyledButton>
      </Component>

     
      
      

        
    )
}


export default GroupedButton;