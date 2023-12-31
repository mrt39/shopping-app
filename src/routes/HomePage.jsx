/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import backgroundVideo from '../assets/videos/background.mp4'
import SearchIcon from '@mui/icons-material/Search';


function HomePage({changeApiLink}) {

  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //send the api link with the search tag
    changeApiLink(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page_size=39&stores=1,2,3,5,6,7,11&exclude_stores=4,8,9&search=${inputVal}&page=1`)
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
  