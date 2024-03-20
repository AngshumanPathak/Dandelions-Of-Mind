import React from 'react'

import {useEffect} from 'react'


import { getProducts, getNameStands } from '../../../redux/actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

import Banner from './Banner'
import Slide from './Slides'
import {Box,styled} from '@mui/material';
import Slide2 from './Slides2'

const Component = styled(Box)`
   padding: 10px 10px;
   background: white;
  
   
  `



const Home = () => {


  const {products} =useSelector((state) => state.getProducts);
  const {nameStands} =useSelector((state) => state.getNameStands);  

  
  
  const dispatch = useDispatch();


  useEffect (() => {
    dispatch(getProducts());
    dispatch(getNameStands());
  }, [dispatch])
  
  return (  
       <>
          <Component>
          
            <Banner/>
            <Slide products = {products}/>
            <Slide2 namestands = {nameStands}/>
          
          
          </Component>
          
       
       
          
          
          
       
       
       </>
           
           
       
  )
}

export default Home
