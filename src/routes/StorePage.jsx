/* eslint-disable react/prop-types */
import ItemCards from '../components/ItemCards';
import { useEffect, useState } from 'react'
import logoImage from '../assets/images/logo-v.png'
import Pagination from '@mui/material/Pagination';
import GamePage from '../components/GamePage.jsx';
import SnackBarComp from '../components/SnackBar.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

//import utilities and hooks
import { isNumeric, decidePrice, getThisYear } from '../utilities/utils';
import { getBestOfYearLink } from '../utilities/gameService';
import { useGameData } from '../utilities/useGameData';

export default function ShopPage({handleAddtoCart, apiLink, gamesInCart, changeApiLink}) {
  //use the hook for data loading
  const { allGames, gameCount, hasLoaded } = useGameData(apiLink);
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    //apilink comes with the &page=xxx at the end of it, so check how many of the last characters are numbers and remove the that number, instead add our pagenumber!
    if (isNumeric(apiLink.slice(-3))){
      var apiLinkMod=apiLink.slice(0, -3)
    }
    else if (isNumeric(apiLink.slice(-2))) {
       apiLinkMod=apiLink.slice(0, -2)
    }
    else{
       apiLinkMod=apiLink.slice(0, -1)
    }

    changeApiLink(apiLinkMod+value)
    setPage(value);
    console.log(value)
    console.log(page)
  };
  
  //limit the page count with 100
  const handlePageCount = () => {
    let pageCount = parseInt(gameCount/39)
    if (pageCount > 100) {
      pageCount = 100
    }
    return pageCount
  }

  //set default API link if none provided
  useEffect(() => {
    //change the page to 1 if user clicks on another link on the left tab
    if(apiLink && apiLink.slice(-1)==="1"){
      setPage(1)
    }

    //if the user has reached here through clicking on "store" link, which sends no apiLink, change the apilink to best of 2023 games and render those
    if (!apiLink) {
      changeApiLink(getBestOfYearLink());
    }
  }, [apiLink, changeApiLink]);

/* SNACKBAR states and functions */
  const [open, setOpen] = useState(false);
/* SNACKBAR states and functions end */


/* GAMEPAGE STATES AND FUNCTIONS */
  const [gamePageOpen, setGamePageOpen] = useState(false);
  const [gameID, setGameID] = useState(0);
  const [gamePrice, setGamePrice] = useState(0);
  const [gameScreenshots, setGameScreenshots] = useState([]);

  const handleClickOpen = (gameID, gamePrice, gameScreenshots) => {
    //change the gameid state
    setGameID(gameID);
    setGameScreenshots(gameScreenshots);
    setGamePrice(gamePrice);
    setGamePageOpen(true);  
  };
/* GAMEPAGE STATES AND FUNCTIONS END */

  return (
    <>  
    {gamePageOpen ?
    <GamePage
    gameID={gameID}
    gameScreenshots={gameScreenshots}
    gamePageOpen={gamePageOpen}
    setGamePageOpen={setGamePageOpen}
    handleAddtoCart={handleAddtoCart}
    price={gamePrice}
    gamesInCart={gamesInCart}
    />
    :""}
      {hasLoaded ? 
      <div>
        {/* if allgames has any items, display them.*/}
        {allGames.length > 0 ? 
        <div>
        <div className="cardContainer">
                {/* render all items in the allGames array */}
                {allGames.map((game) => {
                  return <ItemCards key={game.name}
                  price={decidePrice(game.name)}
                  gameName={game.name}
                  gameID={game.id}  
                  gameScreenshots={game.short_screenshots}
                  handleAddtoCart={handleAddtoCart} 
                  gamesInCart={gamesInCart}
                  handleClickOpen={handleClickOpen}
                  setOpen={setOpen}
                  /* if image exists in the database, pass the image. if not, render a default game image */
                  {...( (game.background_image !== null) ? {
                   imgUrl : game.background_image }  
                   :
                  { imgUrl : logoImage} 
                  
                )}
                /> ;
                
                })}
                
          </div> 
          <br /><br /> 
          { 
          /* if  there are less than 36 items on display, don't display the pagination*/
          allGames.length > 35 ?
          <Pagination siblingCount={2}  size="large" color="primary" count={handlePageCount()} page={page} onChange={handlePageChange} />
          :""
          }
          </div>
          : 
            <h4 className='storePageNoGamesAlert'>There are no games in the database that match the search!</h4>
          }

      <SnackBarComp
      setOpen={setOpen}
      open={open}/>
      </div>
      : 
      <Box sx={{ display: 'flex' }}>
        <CircularProgress  className='circularProgressIcon'
                size={80}/>
      </Box>
      } 
    </>
  )
}