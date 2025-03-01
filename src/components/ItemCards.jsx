/* eslint-disable react/prop-types */
import { decidePrice, checkIfInCart } from '../utilities/utils';


export default function ItemCards({gameName, imgUrl, handleAddtoCart, gamesInCart, setOpen, handleClickOpen, gameID, gameScreenshots, price}) {

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
                    handleAddtoCart({gameName}, decidePrice({gameName}), {imgUrl});
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

