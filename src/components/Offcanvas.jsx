/* eslint-disable react/prop-types */
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";




function OffCanvas({gamesInCart, handleDelete}) {

  function findGrandTotal(){
    var grandTotal = 0
    for (let x=0 ; x<gamesInCart.length; x++){
       grandTotal += parseInt(gamesInCart[x].price) 
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
        <div id='offcanvasBoxContainer'>
          {gamesInCart.map((game) => (
                <a key={game.name} className="card4" href="#">
                <img className="offcanvasgameImg" src= {game.imageUrl.imgUrl} alt="" />
                <h3>{game.name}</h3>
                <p className="offcanvasPrice">${game.price}</p>
                <div className="dimmer"></div>
                <div className="go-corner" href="#">
                  <div className="go-arrow">
                    <p onClick={() => handleDelete(game.name)} className='cartTrashBtn'>X</p>
                  {/* <DeleteIcon onClick={() => handleDelete(game.name)} variant="footer" className='cartTrashBtn'/> */}
                  </div>
                </div>
              </a>
          ))}


      <h5 className="offCanvasTotal">Total: ${findGrandTotal()}</h5>
      <Link to="cart"><button type="button" className="btn styleBtn offCanvasBtn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark">Proceed to Checkout</button></Link>

      </div>
      }
    </div>
    </>
  )
}

export default OffCanvas
