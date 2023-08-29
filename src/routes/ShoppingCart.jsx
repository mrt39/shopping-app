import Orders from '../components/Orders';


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
  