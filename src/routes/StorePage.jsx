import ItemCards from '../components/ItemCards';
import { useEffect, useState } from 'react'




function ShopPage({handleAddtoCart}) {

  const [allGames, allGamesChange] = useState([]);
  const [hasLoaded, loadedToggle] = useState(false);

  //get the first 50 games from the API, and store it in the allGames state
  useEffect(() => {
       fetch('https://api.rawg.io/api/games?key=e6ddcb78aeda4b678f21e8f6a97890cf&page_size=50')
          .then((res) => res.json())
          .then((data) => {
            allGamesChange(data.results)
            loadedToggle(true)
            console.log(data[1].name)
            handleAddtoCart()
          })
          .catch((err) => {
            console.log(err.message);
          }); 
  }, [])
 

  return (
    <>  
      {hasLoaded ? 
        <div id="cardContainer"  >
        {/* render all items in the allGames array */}
        {allGames.map((game) => {
          return <ItemCards key={game.name}
          name={game.name}  
          handleAddtoCart={handleAddtoCart} 
/*           isFlipped = {isFlipped}
          handleBlinkClick = {handleBlinkClick} */
          imgUrl = {game.short_screenshots[0].image}
          /* imgUrl = {game.imgUrl} */ 
          />;
          })}
{/*         <ItemCards name={allGames.results[0].name}/> */}
        </div> 
      : "" 
      } 
    </>
  )

}
  
  export default ShopPage
  