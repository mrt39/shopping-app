import * as React from 'react';
import ItemCards from '../components/ItemCards';
import { useEffect, useState, useRef } from 'react'
import logoImage from '../assets/images/logo-v.png'
import Pagination from '@mui/material/Pagination';
import GamePage from '../components/GamePage.jsx';
import SnackBarComp from '../components/SnackBar.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';




function ShopPage({handleAddtoCart, apiLink, gamesInCart, changeApiLink}) {

  const [allGames, allGamesChange] = useState([]);
  const [hasLoaded, loadedToggle] = useState(false);
  const [gameCount, setGameCount] = useState(0);
  const [page, setPage] = useState(1);

  //check to see if a string is numeric
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const handlePageChange = (event, value) => {
    //apilink comes with the &page=xxx at the end of it, so we check how many of the last characters are numbers and remove the that number, instead add our pagenumber!
    if (isNumeric(apiLink.slice(-3))){
      var apiLinkMod=apiLink.slice(0, -3)
    }
    else if (isNumeric(apiLink.slice(-2))) {
       apiLinkMod=apiLink.slice(0, -2)
    }
    else{
       apiLinkMod=apiLink.slice(0, -1)
    }
    console.log(apiLinkMod+value)
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

  //get the first 50 games from the API, and store it in the allGames state
  useEffect(() => {
    loadedToggle(false)

       fetch(apiLink)
          .then((res) => res.json())
          .then((data) => {
            //filter porn games 
            for (let x=0 ; x<(data.results).length; x++){
              if(data.results[x].tags !== null){
                if (data.results[x].tags.find(element => element.id === 50)){
                  data.results.splice(x, 1)  
                }
              }
            }
            allGamesChange(data.results)
            setGameCount(data.count)
            loadedToggle(true)
            console.log(gameCount)
            handleAddtoCart()
          })
          .catch((err) => {
            console.log(err.message);
          }); 
  }, [page, apiLink])

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
  setGameID(gameID)
  setGameScreenshots(gameScreenshots);
  setGamePrice(gamePrice)
  setGamePageOpen(true);  
};

/* GAMEPAGE STATES AND FUNCTIONS END */


  //set a price on each game, based on the length of the game's name.
  //this is to make sure games will always have the same price
  function decidePrice (name){

    let nameOftheGame = name
    
    if (nameOftheGame.length > 30){
      return "15"
    }
    else if (nameOftheGame.length > 20){
      return "20"
    }
    else if (nameOftheGame.length > 10){
      return "40"
    }
    else{
      return "30"
    }
  }


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
          <Pagination siblingCount={2}  size="large" color="primary" count={handlePageCount()}  onChange={handlePageChange} />
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
  
  export default ShopPage
  
