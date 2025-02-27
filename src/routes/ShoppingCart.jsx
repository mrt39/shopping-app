/* eslint-disable react/prop-types */

import Orders from '../components/Orders.jsx';


function ShopPage({gamesInCart, handleDelete, handlePurchase}) {


    return (
      <>
        <div id="shoppingCartContainer">
            <Orders
            gamesInCart={gamesInCart}
            handleDelete={handleDelete}
            handlePurchase={handlePurchase}
            />
        </div>
      </>
    )
  }
  
  export default ShopPage
  