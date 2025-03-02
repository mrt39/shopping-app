/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [gamesInCart, setGamesInCart] = useState([]);
  const [cartBadgeNumber, setCartBadgeNumber] = useState(0);

  // Update badge number whenever cart changes
  useEffect(() => {
    setCartBadgeNumber(gamesInCart.length);
  }, [gamesInCart]);

  // Add game to cart
  function handleAddToCart(gameName, gamePrice, imgURL) {
    setGamesInCart(prevCart => [
      ...prevCart, 
      {
        "name": gameName.gameName, 
        "price": gamePrice, 
        "imageUrl": imgURL
      }
    ]);
  }

  // Remove game from cart
  function handleDelete(gameName) {
    setGamesInCart(gamesInCart.filter(element => element.name !== gameName));
  }

  // Clear cart after purchase
  function handlePurchase() {
    setGamesInCart([]);
  }

  const value = {
    gamesInCart,
    cartBadgeNumber,
    handleAddToCart,
    handleDelete,
    handlePurchase
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}