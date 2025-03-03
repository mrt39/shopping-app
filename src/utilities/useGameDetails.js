import { useState, useCallback, useMemo } from 'react';

export function useGameDetails() {
  const [gamePageOpen, setGamePageOpen] = useState(false);
  const [gameID, setGameID] = useState(0);
  const [gamePrice, setGamePrice] = useState(0);
  const [gameScreenshots, setGameScreenshots] = useState([]);

  //useCallback prevents recreation of this handler function on each render
  //important since this function gets passed to many ItemCards components and without it, it would cause all ItemCards to re-render unnecessarily
  const handleClickOpen = useCallback((gameID, gamePrice, gameScreenshots) => {
    setGameID(gameID);
    setGameScreenshots(gameScreenshots);
    setGamePrice(gamePrice);
    setGamePageOpen(true);  
  }, []);

  //useMemo prevents recreation of this object on every render
  //this helps prevent unnecessary re-renders in components that uses this hook
  return useMemo(() => ({
    gamePageOpen,
    setGamePageOpen,
    gameID,
    gamePrice,
    gameScreenshots,
    handleClickOpen
  }), [gamePageOpen, setGamePageOpen, gameID, gamePrice, gameScreenshots, handleClickOpen]);
}