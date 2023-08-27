import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from 'react'
import StorePage from "./routes/StorePage";
import ShoppingCart from "./routes/ShoppingCart"
import HomePage from "./routes/HomePage"
import './App.css'


const Router = () => {

  const [gamesInCart, updateCart] = useState([]);

  function handleAddtoCart (gameName, gamePrice){

    updateCart(["kekori", "yesbb"])
    console.log("waddup")
    console.log(gameName.name)
    console.log(gamePrice)

  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
/*       errorElement: <ErrorPage />,*/  
      children: [
        { index: true, element: <HomePage /> },
        { path: "store", element: <StorePage 
          handleAddtoCart={handleAddtoCart} 
        /> },
        { path: "cart", element: <ShoppingCart 
          gamesInCart={gamesInCart}
        /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
