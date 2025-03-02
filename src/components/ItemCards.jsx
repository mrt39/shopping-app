/* eslint-disable react/prop-types */
import { decidePrice, checkIfInCart } from '../utilities/utils';
import { useCart } from '../contexts/CartContext';


export default function ItemCards({gameName, imgUrl, setOpen, handleClickOpen, gameID, gameScreenshots, price}) {

  const {handleAddToCart, gamesInCart } = useCart();

  return (
    <>
    <div className="card cardBorder">
    <a className='storeCardLink' onClick={() => handleClickOpen({gameID}, {price}, {gameScreenshots})} href="#">
        <img src={imgUrl} className="card-img-top" alt="..."/>
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
                  onClick={() => {
                    handleAddToCart({gameName}, decidePrice({gameName}), {imgUrl});
                    setOpen(true);
                  }}
                >
                  Add to Cart
                </button>
              }
          </div>
       
    </div>
    </>
  )
}

