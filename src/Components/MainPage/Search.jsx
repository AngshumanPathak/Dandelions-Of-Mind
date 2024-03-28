import React, { useState, useEffect } from "react";
import { InputBase, Box, styled, List, ListItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { getNameStands } from "../../redux/actions/namstandActions";
import { getOthers } from "../../redux/actions/otherActions";

const SearchContainer = styled(Box)(({ theme }) => ({
  background: 'antiquewhite',
  width: '30%',
  borderRadius: '3px',
  marginLeft: '50px',
  display: 'flex',

  [theme.breakpoints.down('md')]: {
    width: '40%',
    marginLeft: '10px'
  }
}));

const InputSearchBase = styled(InputBase)`
  padding-left: 20px;
  width: 100%;
  font-size: unset;
`;

const SearchIconWrapper = styled(Box)`
  color: gray;
  margin-top: 4px;
`;

const ListWrapper = styled(List)`
  position: absolute;
  background: antiquewhite;
  color: grey;
  margin-top: 35px;
`;

const Search = () => {
  const [text, setText] = useState(""); // Changed initial state to empty string
  const dispatch = useDispatch();

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getNameStands());
    dispatch(getOthers());
  }, [dispatch]);

  // Selector for products state

  const { products } = useSelector(state => state.getProducts, shallowEqual);
  // Selector for namestands state
  const { nameStands } = useSelector(state => state.getNameStands, shallowEqual);

  // Selector for others state
  const { others } = useSelector(state => state.getOthers, shallowEqual);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <SearchContainer>
      <InputSearchBase
        placeholder="Search for products here"
        onChange={handleTextChange}
        value={text}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      {text && (
        <ListWrapper>
          {/* Rendering filtered products */}
          {products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
            <ListItem key={product.id}>
              <Link to={`product/${product.id}`} onClick={() => setText('')}>
                {product.title.longTitle}
              </Link>
            </ListItem>
          ))}

          {/* Rendering filtered namestands */}
          {nameStands.filter(namestand => namestand.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(namestand => (
            <ListItem key={namestand.id}>
              <Link to={`namestand/${namestand.id}`} onClick={() => setText('')}>
                {namestand.title.longTitle}
              </Link>
            </ListItem>
          ))}

          {/* Rendering filtered others */}
          {others&&others.filter(other => other.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(other => (
            <ListItem key={other.id}>
              <Link to={`other/${other.id}`} onClick={() => setText('')}>
                {other.title.longTitle}
              </Link>
            </ListItem>
          ))}
        </ListWrapper>
      )}
    </SearchContainer>
  );
};

export default Search;
