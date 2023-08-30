import ItemCards from '../components/ItemCards';
import { useEffect, useState } from 'react'




function ShopPage({handleAddtoCart, setQuantity, apiLink}) {

  const [allGames, allGamesChange] = useState([]);
  const [hasLoaded, loadedToggle] = useState(false);

  //get the first 50 games from the API, and store it in the allGames state
  useEffect(() => {
       fetch(apiLink)
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
      <div>
        {/* if allgames has any items, display them.*/}
        {allGames.length > 0 ? 
        <div className="cardContainer">
                {/* render all items in the allGames array */}
                {allGames.map((game) => {
                  return <ItemCards key={game.name}
                  name={game.name}  
                  handleAddtoCart={handleAddtoCart} 
                  setQuantity={setQuantity}
                  /* imgUrl = {game.short_screenshots[0].image}  */
                />;
                })}
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
  