
import { InputBase, Box, styled } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled (Box)`

background: antiquewhite;
width: 30%;
border-radius: 3px;
margin-left: 50px;
display: flex;


`

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
