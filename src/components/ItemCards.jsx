import NumberInput from './NumberInput.jsx';
import AddToCart from './AddToCart.jsx';
import { useEffect, useState } from 'react'

function ItemCards({name, imgUrl, handleAddtoCart, setQuantity}) {

  
  //set a price on each game, based on the length of the game's name.
  //this is to make sure each game will always have the same price
  function decidePrice (name){

    let nameOftheGame = name.name
    
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


  return (
    <>
    <div className="card cardBorder">
        <img src={imgUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h5 className="priceTag"> {decidePrice({name})}$</h5>
            <div id="cardButtonContainer">
            <NumberInput 
            setQuantity={setQuantity}
            gameName={name}
            />
            <a href="#" className="btn" onClick={() => handleAddtoCart({name}, decidePrice({name}))}><AddToCart/></a>
            </div>
        </div>
    </div>
    </>
  )
}

export default ItemCards
