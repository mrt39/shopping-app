/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import backgroundVideo from '../assets/videos/background.mp4'
import { Search as SearchIcon } from '@mui/icons-material';
import { getSearchLink } from "../utilities/gameService";
import { useGames } from '../contexts/GamesContext';
import { debounce } from '../utilities/utils';
import { searchGames } from '../utilities/searchFunctionality';

function HomePage() {
  //context hook to change the API link for searching
  const { changeApiLink } = useGames();
  //store the current input value in the search box
  const [inputVal, setInputVal] = useState("");
  //store search results retrieved from the API
  const [searchResults, setSearchResults] = useState([]);
  //control visibility of the search dropdown menu
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // debounce search function waits to send API request until user stops typing
  // this improves performance and reduces unnecessary network requests
  const fetchSearchResults = useCallback(
    debounce(async (searchTerm) => {
      // don't search for very short queries to minimize irrelevant results
      if (searchTerm.length < 3) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);
      try {
        // limit to 5 results for better dropdown performance
        const results = await searchGames(searchTerm, 5);
        
        setSearchResults(results);
        // only show dropdown if we have actual results to display
        setShowDropdown(results.length > 0);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        // reset loading state when search completes
        setIsLoading(false);
      }
    }, 300), // wait 300ms after typing stops before executing search
    []
  );

  //trigger search whenever user input changes
  useEffect(() => {
    fetchSearchResults(inputVal);
  }, [inputVal, fetchSearchResults]);

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  //handle submission of the search form when user presses Enter or clicks search button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim() === '') return;
    
    //change the store page API link to show search results
    changeApiLink(getSearchLink(inputVal));
    //navigate to store page to display full search results
    navigate("/shopping-app/store");
    //hide the dropdown after submitting search
    setShowDropdown(false);
  };

  //handle clicking on a specific search result in dropdown
  const handleResultClick = (gameName) => {
    //set the API link to search for this specific game
    changeApiLink(getSearchLink(gameName));
    //navigate to store page to show results
    navigate("/shopping-app/store");
    //hide dropdown after selection
    setShowDropdown(false);
    setInputVal(gameName);
  };

  //close dropdown when user clicks elsewhere on the page
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    document.addEventListener('click', handleClickOutside);
    //clean event listener
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <div id="homePageContainer">
        <video id="background-video" autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4"/>
        </video>
        {/* SEARCH BAR */}
        <div className="searchBarContainer">
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            {/* prevent outside clicks from closing dropdown when clicking inside search area */}
            <div className="search-input-container" onClick={(e) => e.stopPropagation()}>
              <div className="search-input-wrapper">
                <input 
                  className="form-control me-2" 
                  type="search" 
                  placeholder="Search for a game!" 
                  aria-label="Search" 
                  value={inputVal}
                  onChange={handleInputChange}
                />
                <button className="search-button" type="submit">
                  <SearchIcon className="searchIcon" />
                </button>
              </div>
              
              {/* dynamically show search results when available */}
              {showDropdown && searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map(game => (
                    <div 
                      key={game.id} 
                      className="search-result-item"
                      onClick={() => handleResultClick(game.name)}
                    >
                      {/* display game thumbnail if available */}
                      {game.background_image && (
                        <img 
                          src={game.background_image} 
                          alt={game.name}
                          className="search-result-image"
                        />
                      )}
                      <span>{game.name}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* show loading indicator during search for better UX */}
              {isLoading && (
                <div className="search-dropdown">
                  <div className="search-loading">Loading...</div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default HomePage;