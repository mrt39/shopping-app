/* eslint-disable react/prop-types */
import { decidePrice, checkIfInCart } from '../utilities/utils';
import { useCart } from '../contexts/CartContext';
import { memo, useCallback } from 'react';

//memo prevents this component from re-rendering unless its props change
//this is critical for performance since many instances of this component exist on the page
//when one card changes (e.g., added to cart), other cards shouldn't re-render
//without memo, changing one item would cause all cards to re-render
const ItemCards = memo(function ItemCards({gameName, imgUrl, setOpen, handleClickOpen, gameID, gameScreenshots, price}) {

  const {handleAddToCart, gamesInCart } = useCart();
  
  //useCallback memoizes this click handler to prevent recreation on each render
  //it prevents creating a brand new function on each render. Without it, a new function would be created on every render of each card
  //this also ensures that adding a game to the cart doesn't cause other item cards to re-render
  const handleAddToCartClick = useCallback(() => {
    handleAddToCart({gameName}, decidePrice({gameName}), {imgUrl});
    setOpen(true);
  }, [handleAddToCart, gameName, imgUrl, setOpen]);
  
  //useCallback memoizes this click handler to prevent recreation of the function on each rendered itemcard
  //this ensures stable function references, which helps performance, same as the above useCallback
  const handleGameClick = useCallback(() => {
    handleClickOpen({gameID}, {price}, {gameScreenshots})
  }, [handleClickOpen, gameID, price, gameScreenshots]);

  return (
    <>
    <div className="card cardBorder">
    <a className='storeCardLink' onClick={handleGameClick} href="#">
        <img 
          src={imgUrl} 
          className="card-img-top" 
          alt="..." 
          loading="lazy" //native lazy loading defers loading images until they're near viewport
        />
        <div className="card-body">
          <div id="cardTitlePriceContainer">            
            <h5 className="card-title">{gameName}</h5>
            <h5 className="priceTag"> {decidePrice({gameName})}$</h5>
          </div>
        </div>
        </a>
          <div id="cardButtonContainer">
              {/* if already in cart, render an unclickable button, that says "In Cart" */}
              {checkIfInCart(gameName, gamesInCart) ? 
                <button type="button" className='btn inCartBtn'>In Cart</button>
                :
                <button 
                  type="button" 
                  className='btn styleBtn addToCartBtn'
                  onClick={handleAddToCartClick}
                >
                  Add to Cart
                </button>
              }
          </div>
       
    </div>
    </>
  )
});

export default ItemCards;