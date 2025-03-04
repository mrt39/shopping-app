
/* performs a search in the RAWG API with built-in filtering */
export async function searchGames(searchTerm, pageSize = 5) {
    //skip api call for searches that are too short
    if (!searchTerm || searchTerm.length < 3) {
      return [];
    }
    try {
      const API_KEY = import.meta.env.VITE_API_KEY;
      
      //construct and execute the API request to RAWG
      //pageSize limits the number of results returned
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${pageSize}&search=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`);
      }
      const data = await response.json();
      
      //apply adult content filter to ensure appropriate content
      const filteredResults = filterAdultContent(data.results);
      
      return filteredResults;
    } catch (error) {
      console.error('Game search error:', error.message);
      // return empty array on error to prevent UI breakage
      return [];
    }
  }
  
 /*filter out adult content */
  function filterAdultContent(results) {
    // adult content in RAWG API is identified by tag ID 50
    return results.filter(game => 
      !game.tags?.some(tag => tag.id === 50)
    );
  }
  

/*format game search results for display in the UI */
  export function formatSearchResults(results) {
    //extract only the properties needed for the search results dropdown
    //in order to reduce memory usage and improve rendering performance
    return results.map(game => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image
    }));
  }