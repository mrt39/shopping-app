import { useState } from 'react';

export function useGameDetails() {
  const [gamePageOpen, setGamePageOpen] = useState(false);
  const [gameID, setGameID] = useState(0);
  const [gamePrice, setGamePrice] = useState(0);
  const [gameScreenshots, setGameScreenshots] = useState([]);

  const handleClickOpen = (gameID, gamePrice, gameScreenshots) => {
    setGameID(gameID);
    setGameScreenshots(gameScreenshots);
    setGamePrice(gamePrice);
    setGamePageOpen(true);  
  };

  return {
    gamePageOpen,
    setGamePageOpen,
    gameID,
    gamePrice,
    gameScreenshots,
    handleClickOpen
  };
}