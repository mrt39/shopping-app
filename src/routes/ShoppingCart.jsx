import Orders from '../components/Orders';


function ShopPage({gamesInCart}) {


    return (
      <>
        <div id="shoppingCartContainer">
          <p>{gamesInCart}</p>
            <Orders/>
        </div>
      </>
    )
  }
  
  export default ShopPage
  