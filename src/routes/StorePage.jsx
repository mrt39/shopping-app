import ItemCards from '../components/ItemCards';
import { useEffect, useState } from 'react'
import logoImage from '../assets/images/logo.png'
import Pagination from '@mui/material/Pagination';
import { useNavigate } from "react-router-dom";





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
       fetch(apiLink)
          .then((res) => res.json())
          .then((data) => {
            allGamesChange(data.results)
            setGameCount(data.count)
            loadedToggle(true)
            console.log(data[1].name)
            console.log(gameCount)
            handleAddtoCart()
          })
          .catch((err) => {
            console.log(err.message);
          }); 
  }, [page, apiLink])
 

  return (
    <>  
      {hasLoaded ? 
      <div>
        {/* if allgames has any items, display them.*/}
        {allGames.length > 0 ? 
        <div>
        <div className="cardContainer">
                {/* render all items in the allGames array */}
                {allGames.map((game) => {
                  return <ItemCards key={game.name}
                  gameName={game.name}  
                  handleAddtoCart={handleAddtoCart} 
                  gamesInCart={gamesInCart}
                  /* if image exists in the database, pass the image. if not, render a default game image */
                  {...( (game.background_image !== null) ? {
                   imgUrl : game.background_image }  
                   :
                  { imgUrl : logoImage}
                )}
                />;
                })}
          </div> 
          <br /><br />  
          <Pagination siblingCount={2}  size="large" color="primary" count={handlePageCount()}  onChange={handlePageChange} />
          </div>
          : 
            <h4 className='storePageNoGamesAlert'>There are no games in the database that match the search!</h4>
          }
      </div>
      : "" 
      } 
    </>
  )

}
  
  export default ShopPage
  