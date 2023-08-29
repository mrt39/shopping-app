import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from 'react'
import StorePage from "./routes/StorePage";
import ShoppingCart from "./routes/ShoppingCart"
import HomePage from "./routes/HomePage"
import './App.css'


const Router = () => {

  const [gamesInCart, updateCart] = useState([]);

  //updates the 
  const [cartBadgeNumber, updateCartBadgeNumber] = useState(0);

  //stores the selected quantity of each game (that are currently on screen) in an array with the format: [name: gameName, quantity: quantity]
  const [quantityOfEach, toggleQuantity] = useState([]);

  //stores the api link that will be passed to the StorePage component, to display games
  const [apiLink, toggleApiLink] = useState("");


  function handleAddtoCart (gameName, gamePrice){
    console.log(gameName.name)
    console.log(gamePrice)

    //the quantity of the game from the quantityOfEach state
    var gameArray = quantityOfEach.find(element => element.name === gameName.name)


    //find the quantity of the game. if doesn't exist, do nothing
    if (typeof gameArray == "undefined") {
      console.log("doesn't have quantity")
    }
    //if the quantity exists for this game,
    else {
      //get the quantity 
      var gameQuantity = gameArray.quantity 
      console.log("quantity is: " +gameQuantity)

      //if it already exists in the cart, update the quantity
      if (gamesInCart.find(element => element.name === gameName.name)){
        console.log("it's already in cart yo")
        //CHANGE THE STATE TO CHANGE THE quantity of the element within the state array!!!!!
        //https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array
        let copyArray = gamesInCart.map(l => Object.assign({}, l)); /* this is how you copy an array of objects in react. */
        let game = copyArray.find(element => element.name === gameName.name)
        //find the index of the game
        const indexOfGame = copyArray.indexOf(game);
        //change the copy array
        copyArray[indexOfGame].quantity+=gameQuantity
        //change the state
        updateCart(copyArray)
        console.log(gamesInCart)
      }
      else{

      //if it does not, add it to the cart
      console.log("it's not in the cart, added now")
      updateCart(gamesInCart => [...gamesInCart, {"name": gameName.name, "quantity": gameQuantity, "price": gamePrice}])
      console.log(gamesInCart)
      }

    }
  }


  //sets the quantity of the each game and stores it in the array, based on the value returned from NumberInput component
  function setQuantity (gameName, quantity){

    //if an entry with the same name exists, just update the quantity
    if (quantityOfEach.find(element => element.name === gameName)) {
      console.log("found")
      console.log(quantityOfEach)
      //CHANGE THE STATE TO CHANGE THE quantity of the element within the state array!!!!!
      //https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array
      let copyArray = quantityOfEach.map(l => Object.assign({}, l)); /* this is how you copy an array of objects in react. */
      let game = copyArray.find(element => element.name === gameName)
      //find the index of the game
      const indexOfGame = copyArray.indexOf(game);
      //change the copy array
      copyArray[indexOfGame].quantity=quantity
      //change the state
      toggleQuantity(copyArray)
    }

    //if not, create a new entry with adding the object 
    else{
      console.log("not found")
      toggleQuantity(quantityOfEach => [...quantityOfEach, {"name": gameName, "quantity": quantity}])
      console.log(quantityOfEach)
    }

  }

  //handle the delete button from the cart
  function handleDelete(gameName){
    //remove from an array in state https://react.dev/learn/updating-arrays-in-state#removing-from-an-array
    updateCart(gamesInCart.filter(element => element.name !== gameName))
  }

  //handle the purchase button from the cart page
  function handlePurchase(){
    toggleQuantity([])
    updateCart([])
  }

  //decides on what api link will be sent to the StorePage component, based on the user's choices
  function changeApiLink(link){

    toggleApiLink(link)
    console.log(apiLink)

  }


    //everyime gamesInCart state updates, update the badge number for the cart icon on top right
    useEffect(() => {

      updateCartBadgeNumber(gamesInCart.length)
      console.log("badge number: " +cartBadgeNumber)

 }, [gamesInCart])



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard 
      cartBadgeNumber={cartBadgeNumber}
      gamesInCart={gamesInCart}
      handleDelete={handleDelete}
      changeApiLink={changeApiLink}
      />,
/*       errorElement: <ErrorPage />,*/  
      children: [
        { index: true, element: <HomePage /> },
        { path: "store", element: <StorePage 
          handleAddtoCart={handleAddtoCart} 
          setQuantity={setQuantity}
          apiLink = {apiLink}
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
