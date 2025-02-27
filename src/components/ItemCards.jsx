/* eslint-disable react/prop-types */

function ItemCards({gameName, imgUrl, handleAddtoCart, gamesInCart, setOpen, handleClickOpen, gameID, gameScreenshots, price}) {

  //set a price on each game, based on the length of the game's name.
  //this is to make sure games will always have the same price
  function decidePrice (name){

    let nameOftheGame = name.gameName
    
    if (nameOftheGame.length > 30){
      return "15"
    }
    else if (nameOftheGame.length > 20){
      return "20"
    }
    else if (nameOftheGame.length > 10){
      return "40"
    }
    else{
      return "30"
    }
  }

  function checkIfInCart(){
    if (gamesInCart.find(element => element.name === gameName)){
      return true 
    }
  }



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
              {checkIfInCart() ? 
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

export default ItemCards

