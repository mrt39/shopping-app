/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { findGrandTotal } from '../utilities/utils';
import { useCart } from '../contexts/CartContext';



export default function Orders() {

  const { gamesInCart, handleDelete, handlePurchase } = useCart();


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
              <TableCell align="right">Price</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {gamesInCart.map((game) => (
              <TableRow key={game.name}>
                <TableCell>{game.name}</TableCell>
                <TableCell align="right">${game.price}</TableCell>
                <TableCell onClick={() => handleDelete(game.name)} variant="footer" className='cartTrashBtn'><DeleteIcon/></TableCell>
              </TableRow>
            ))}
            <TableRow >
              <TableCell className='grandTotalCell'><b>Total:</b></TableCell>
              <TableCell align="right" className='grandTotalCell'><b>${findGrandTotal(gamesInCart)}</b></TableCell>
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
                Total spent: ${findGrandTotal(gamesInCart)}
              </div>
              <div className="modal-footer">
              <Link to="/shopping-app/"><button type="button" onClick={() => handlePurchase()} className="btn styleBtn" data-bs-dismiss="modal">Return</button></Link>
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