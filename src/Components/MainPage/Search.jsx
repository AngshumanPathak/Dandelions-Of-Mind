
import { InputBase, Box, styled } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled (Box)(({ theme }) => ({
  background: 'antiquewhite',
  width: '30%',
  borderRadius: '3px',
  marginLeft: '50px',
  display: 'flex',

  [theme.breakpoints.down('md')]: {
    width: '40%',
    marginLeft: '10px'
    
  }
   
}))





const InputSearchBase = styled(InputBase)`
padding-left: 20px;
width: 100%;
font-size: unset;

`

const SearchIconWrapper = styled(Box)`
color: gray;
margin-top: 4px;
`





const Search = () => {
  return (
    <SearchContainer>
        <InputSearchBase
        placeholder = "Search for products here"/>
        <SearchIconWrapper>
            <SearchIcon/>
        </SearchIconWrapper>

    </SearchContainer>
  )
}

export default Search
