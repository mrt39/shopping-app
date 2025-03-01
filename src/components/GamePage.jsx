/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState } from 'react'
import { checkIfInCart } from '../utilities/utils';
import { fetchGameDetails, fetchGameStores } from '../utilities/gameService';
import GamePageContent from './GamePageContent';


export default function GamePage({gamePageOpen, setGamePageOpen, gameID, price, gameScreenshots, handleAddtoCart, gamesInCart}) {


  const handleClose = () => {
    setGamePageOpen(false);
  };

  const [gameDetails, setGameDetails] = useState([]);
  const [stores, setStores] = useState([]);

  //get the details of the game, and store it in the gameDetails state
  useEffect(() => {
    if(gameID) {
      fetchGameDetails(gameID.gameID)
        .then(data => {
          setGameDetails(data);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }, [gameID]);

  //get the store links from the api, and store it in the gameDetails state
  useEffect(() => {
    if(gameID) {
      fetchGameStores(gameID.gameID)
        .then(data => {
          setStores(data.results);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }, [gameID]);


  return (
    <React.Fragment>
      <Dialog
        open={gamePageOpen}
        onClose={handleClose}
        className='gamePageDialogBox'
      >
        <GamePageContent 
          gameDetails={gameDetails}
          price={price}
          gameScreenshots={gameScreenshots}
          handleAddtoCart={handleAddtoCart}
          gamesInCart={gamesInCart}
          stores={stores}
          checkIfInCart={checkIfInCart}
        />

        <DialogActions>
          <Button className='gamePageCloseBtn' onClick={handleClose}>
            <p className='gamePageCloseBtnX'>
              <svg width="64px" height="64px" viewBox="0 0 1024 1024" fill="#dcdedf " className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#dcdedf "><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" fill=""></path></g></svg>
            </p>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}