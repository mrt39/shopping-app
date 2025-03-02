/* eslint-disable react/prop-types */
import ItemCards from '../components/ItemCards';
import { useEffect, useState } from 'react'
import logoImage from '../assets/images/logo-v.png'
import { Box, CircularProgress, Pagination } from '@mui/material';
import GamePage from '../components/GamePage.jsx';
import SnackBarComp from '../components/SnackBar.jsx';

//import contexts
import { useGames } from '../contexts/GamesContext';

//import utilities and hooks
import { decidePrice } from '../utilities/utils';
import { getBestOfYearLink } from '../utilities/gameService';
import { useGameData } from '../utilities/useGameData';
import { usePagination } from '../utilities/usePagination.js';
import { useGameDetails } from '../utilities/useGameDetails.js';

export default function ShopPage() {
  //contexts
  const { apiLink, changeApiLink } = useGames();

  //custom hooks
  const { allGames, gameCount, hasLoaded } = useGameData(apiLink);
  const { page, handlePageChange, handlePageCount } = usePagination(apiLink, changeApiLink);
  const { gamePageOpen, setGamePageOpen, gameID, gamePrice, gameScreenshots, handleClickOpen } = useGameDetails();
  
  //snackbar state
  const [open, setOpen] = useState(false);

  //set default API link if none provided
  useEffect(() => {
    //if no apiLink, use best of year
    if (!apiLink) {
      changeApiLink(getBestOfYearLink());
    }
  }, [apiLink, changeApiLink]);

  return (
    <>  
      {gamePageOpen ?
      <GamePage
        gameID={gameID}
        gameScreenshots={gameScreenshots}
        gamePageOpen={gamePageOpen}
        setGamePageOpen={setGamePageOpen}
        price={gamePrice}
      />
      :""}
      
      {hasLoaded ? 
      <div>
        {/* if allgames has any items, display them */}
        {allGames.length > 0 ? 
        <div>
          <div className="cardContainer">
            {allGames.map((game) => (
              <ItemCards key={game.name}
                price={decidePrice(game.name)}
                gameName={game.name}
                gameID={game.id}  
                gameScreenshots={game.short_screenshots}
                handleClickOpen={handleClickOpen}
                setOpen={setOpen}
                imgUrl={game.background_image || logoImage}
              />
            ))}
          </div> 
          <br /><br /> 
          {allGames.length > 35 ?
            <Pagination 
              siblingCount={2} 
              size="large" 
              color="primary" 
              count={handlePageCount(gameCount)} 
              page={page} 
              onChange={handlePageChange} 
            />
          : ""}
        </div>
        : 
        <h4 className='storePageNoGamesAlert'>There are no games in the database that match the search!</h4>
        }

        <SnackBarComp setOpen={setOpen} open={open}/>
      </div>
      : 
      <Box sx={{ display: 'flex' }}>
        <CircularProgress className='circularProgressIcon' size={80}/>
      </Box>
      } 
    </>
  )
}