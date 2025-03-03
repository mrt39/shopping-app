/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [gamesInCart, setGamesInCart] = useState([]);
  const [cartBadgeNumber, setCartBadgeNumber] = useState(0);

  //update badge number whenever cart changes
  useEffect(() => {
    setCartBadgeNumber(gamesInCart.length);
  }, [gamesInCart]);

  //add game to cart
  //useCallback prevents recreation of this function between renders, stabilizing the reference
  //this minimizes unnecessary re-renders in components that use this function
  const handleAddToCart = useCallback((gameName, gamePrice, imgURL) => {
    setGamesInCart(prevCart => [
      ...prevCart, 
      {
        "name": gameName.gameName, 
        "price": gamePrice, 
        "imageUrl": imgURL
      }
    ]);
  }, []);

  //remove game from cart while using useCallback
  const handleDelete = useCallback((gameName) => {
    setGamesInCart(prevCart => prevCart.filter(element => element.name !== gameName));
  }, []);

  //clear cart after purchase while using useCallback
  const handlePurchase = useCallback(() => {
    setGamesInCart([]);
  }, []);

  //useMemo prevents recreation of the context value object on each render
  //it prevents all components that use these from re-rendering when unrelated states change
  const value = useMemo(() => ({
    gamesInCart,
    cartBadgeNumber,
    handleAddToCart,
    handleDelete,
    handlePurchase
  }), [gamesInCart, cartBadgeNumber, handleAddToCart, handleDelete, handlePurchase]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}