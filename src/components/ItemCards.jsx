function ItemCards({gameName, imgUrl, handleAddtoCart, gamesInCart, setOpen}) {

  //set a price on each game, based on the length of the game's name.
  //this is to make sure each game will always have the same price
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
        <img src={imgUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <div id="cardTitlePriceContainer">            
            <h5 className="card-title">{gameName}</h5>
            <h5 className="priceTag"> {decidePrice({gameName})}$</h5>
          </div>

          <div id="cardButtonContainer">
              {/* if already in cart, render an unclickable button, that says "In Cart" */}
              {checkIfInCart()? 
              <a href="#" >
                <button type="button" className='btn inCartBtn'>In Cart</button>
                </a>
                :
                <a href="#" className="btn" onClick={function() {
                  handleAddtoCart({gameName}, decidePrice({gameName}))
                  setOpen(true)
                  } }>
                  <button type="button" className='btn styleBtn' /* onClick={handleClick} */>
                    Add to Cart
                  </button>
                </a>
              }
          </div>
        </div>
    </div>
    </>
  )
}

export default ItemCards

