import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";




export default function Orders({gamesInCart, handleDelete, handlePurchase}) {

  function findGrandTotal(){
    var grandTotal = 0
    for (let x=0 ; x<gamesInCart.length; x++){
       grandTotal += (gamesInCart[x].price * gamesInCart[x].quantity)
    }
    return grandTotal
  }

  return (
    <>
    <h2>SHOPPING CART</h2>
    {gamesInCart.length > 0 ? 
      <React.Fragment>
        <br />
        <Table size="small" className='cartPageTable'>
          <TableHead>
            <TableRow>
              <TableCell>Game</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gamesInCart.map((game) => (
              <TableRow key={game.name}>
                <TableCell>{game.name}</TableCell>
                <TableCell align="center">{game.quantity}</TableCell>
                <TableCell align="center">${game.price}</TableCell>
                <TableCell align="right">{`$${game.quantity*game.price}`}</TableCell>
                <TableCell onClick={() => handleDelete(game.name)} variant="footer" className='cartTrashBtn'><DeleteIcon/></TableCell>
              </TableRow>
            ))}
            <TableRow >
              <TableCell className='grandTotalCell'><b>Grand Total:</b></TableCell>
              <TableCell align="center" className='grandTotalCell'></TableCell>
              <TableCell align="center" className='grandTotalCell'></TableCell>
              <TableCell align="right" className='grandTotalCell'><b>${findGrandTotal()}</b></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Link to=""><button type="button" className="btn styleBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">Purchase</button></Link>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Purchase Complete!</h1>
                <button type="button" className="btn-close" onClick={() => handlePurchase()} data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Total spent: ${findGrandTotal()}
              </div>
              <div className="modal-footer">
              <Link to="/"><button type="button" onClick={() => handlePurchase()} className="btn styleBtn" data-bs-dismiss="modal">Return</button></Link>
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    : <div>
      <br /> <br /><br /><br />
    <h4>Your cart is empty.</h4>
    </div>
    }

    </>
  );
}
