import React from 'react'

import {useEffect} from 'react'


import { getProducts } from '../../../redux/actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

import Banner from './Banner'
import Slide from './Slides'
import {Box,styled} from '@mui/material';

const Component = styled(Box)`
   padding: 10px 10px;
   background: white;
  
   
  `



const Home = () => {


  const {products} =useSelector((state) => state.getProducts);

  console.log (products);
  
  const dispatch = useDispatch();


  useEffect (() => {
    dispatch(getProducts())
  }, [dispatch])
  
  return (  
       <>
          <Component>
          
            <Banner/>
            <Slide products = {products}/>
          
          
          </Component>
          
       
       
          
          
          
       
       
       </>
           
           
       
  )
}

export default Home
