/* eslint-disable react/prop-types */
import * as React from 'react';
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from '@mui/material';
import { useCart } from '../contexts/CartContext.jsx';
import AppHeader from './AppHeader';
import SideDrawer from './SideDrawer';

export default function Dashboard() {
  //cart context
  const { cartBadgeNumber, gamesInCart, handleDelete } = useCart();
  
  //drawer state
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppHeader 
        open={open}
        toggleDrawer={toggleDrawer}
        cartBadgeNumber={cartBadgeNumber}
        gamesInCart={gamesInCart}
        handleDelete={handleDelete}
      />
      
      <SideDrawer 
        open={open}
        toggleDrawer={toggleDrawer}
      />

      <Outlet /> 
    </Box>
  );
}