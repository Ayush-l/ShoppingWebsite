import './App.css'
import React from 'react';
import {Navigation} from "../Customer/Navigation/Navigation"
import HomePage from "../Customer/Components/Pages/HomePage/HomePage"
import Product from '../Customer/Components/Product/Product';
import ProductDetails from '../Customer/Components/ProductDetails/ProductDetails';
import {CheckOut} from '../Customer/Components/CheckOut/CheckOut';
import Order from '../Customer/Components/Order/Order'; 
import OrderDetails from '../Customer/Components/Order/OrderDetails'; 
import CustomRouters from './Routers/CustomRouters';
import {Route,Routes} from 'react-router-dom';
import { useEffect,useState } from 'react';




function App() {
  return (
    <>
      <CustomRouters/>
    </>
  )
}

export default App
