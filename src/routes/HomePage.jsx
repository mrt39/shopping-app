/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import backgroundVideo from '../assets/videos/background.mp4'
import { Search as SearchIcon } from '@mui/icons-material';
import { getSearchLink } from "../utilities/gameService";


function HomePage({changeApiLink}) {

  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //send the api link with the search tag
    changeApiLink(getSearchLink(inputVal));
    navigate("/")
    return navigate("/shopping-app/store");
  };


    return (
      <>
        <div id="homePageContainer">
          <video id="background-video" autoPlay loop muted>
            <source src= {backgroundVideo} type="video/mp4"/>
          </video>
            {/* SEARCH BAR */}
            <div className="searchBarContainer">
              <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search for a game!" aria-label="Search" 
                  value={inputVal}
                  onChange={handleInputChange}
                />
                <button className="search-button" type="submit"><SearchIcon className="searchIcon"></SearchIcon></button>
              </form>
            </div>

        </div>
      </>
    )
  }
  
  export default HomePage
  