import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";




function OffCanvas({gamesInCart, handleDelete}) {

  function findGrandTotal(){
    var grandTotal = 0
    for (let x=0 ; x<gamesInCart.length; x++){
       grandTotal += (gamesInCart[x].price * gamesInCart[x].quantity)
    }
    return grandTotal
  }

  return (
    <>
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark" aria-label="Toggle navigation">
        <ShoppingCartIcon/>
      </button>
      <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbarDark" aria-labelledby="offcanvasNavbarDarkLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarDarkLabel">Cart</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        {/* only display the table if there are items on the cart */}
      {gamesInCart.length > 0 && 
        <div className="offcanvas-body">
        <table className="table-dark">
          <thead>
            <tr>
              <th scope="col">Game</th>
              <th scope="col">Amount</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
          {gamesInCart.map((game) => (
            <tr key={game.name}>
              <td>{game.name}</td>
              <td>{game.quantity}</td>
              <td>{`$${game.quantity*game.price}`}</td>
              <td><DeleteIcon onClick={() => handleDelete(game.name)} variant="footer" className='cartTrashBtn'/></td>
            </tr>
             ))}
          </tbody>
      </table>
      <p>${findGrandTotal()}</p>
      <Link to="cart"><button type="button" className="btn styleBtn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark">Proceed to Checkout</button></Link>
        </div>

    }
      </div>
    </>
  )
}

export default OffCanvas
