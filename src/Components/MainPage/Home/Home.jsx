import React from 'react'

import {useEffect} from 'react'


import { getProducts } from '../../../redux/actions/productActions'
import { getNameStands } from '../../../redux/actions/namstandActions'
import { getOthers } from '../../../redux/actions/otherActions'
import { useDispatch, useSelector } from 'react-redux'

import Banner from './Banner'
import Slide from './Slides'
import {Box,styled} from '@mui/material';
import Slide2 from './Slides2'
import Slide3 from './Slides3'

const Component = styled(Box)`
   padding: 10px 10px;
   background: white;
  
   
  `



const Home = () => {


  const {products} =useSelector((state) => state.getProducts);
  const {nameStands} =useSelector((state) => state.getNameStands);
  const {others} = useSelector((state) => state.getOthers);  

  
  
  const dispatch = useDispatch();


  useEffect (() => {
    dispatch(getProducts());
    dispatch(getNameStands());
    dispatch(getOthers());
  }, [dispatch])
  
  return (  
       <>
          <Component>
          
            <Banner/>
            <Slide products = {products}/>
            <Slide2 namestands = {nameStands}/>
            <Slide3 others = {others}/>
          
          
          </Component>
          
       
       
          
          
          
       
       
       </>
           
           
       
  )
}

export default Home
