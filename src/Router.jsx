import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from 'react'
import StorePage from "./routes/StorePage";
import ShoppingCart from "./routes/ShoppingCart"
import HomePage from "./routes/HomePage"
import './App.css'
import ErrorPage from "./components/error-page";


const Router = () => {

  const [gamesInCart, updateCart] = useState([]);

  //updates the 
  const [cartBadgeNumber, updateCartBadgeNumber] = useState(0);

  //stores the api link that will be passed to the StorePage component, to display games
  const [apiLink, toggleApiLink] = useState("");


  function handleAddtoCart (gameName, gamePrice, imgURL){
    console.log(gameName.gameName)
    console.log(gamePrice)
    console.log(imgURL)
      
    updateCart(gamesInCart => [...gamesInCart, {"name": gameName.gameName, "price": gamePrice, "imageUrl": imgURL}])
    console.log(gamesInCart)
    
  }


  //handle the delete button from the cart
  function handleDelete(gameName){
    //remove from an array in state https://react.dev/learn/updating-arrays-in-state#removing-from-an-array
    updateCart(gamesInCart.filter(element => element.name !== gameName))
  }

  //handle the purchase button from the cart page
  function handlePurchase(){
    updateCart([])
  }

  //decides on what api link will be sent to the StorePage component, based on the user's choices
  function changeApiLink(link){

    toggleApiLink(link)
  }


    //everyime gamesInCart state updates, update the badge number for the cart icon on top right
    useEffect(() => {

      updateCartBadgeNumber(gamesInCart.length)

 }, [gamesInCart])



  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <Dashboard 
      cartBadgeNumber={cartBadgeNumber}
      gamesInCart={gamesInCart}
      handleDelete={handleDelete}
      changeApiLink={changeApiLink}
      />,
      children: [
        { index: true, element: <HomePage 
          changeApiLink ={changeApiLink}
        /> },
        { path: "store", element: <StorePage 
          handleAddtoCart={handleAddtoCart} 
          apiLink = {apiLink}
          changeApiLink={changeApiLink}
          gamesInCart={gamesInCart}
        /> },
        { path: "cart", element: <ShoppingCart 
          gamesInCart={gamesInCart}
          handleDelete={handleDelete}
          handlePurchase={handlePurchase}
        /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
