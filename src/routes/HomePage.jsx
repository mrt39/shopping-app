import { useNavigate } from "react-router-dom";
import { useState } from "react";
import backgroundVideo from '../assets/videos/background.mp4'



function HomePage({changeApiLink}) {

  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //send the api link with the search tag
    changeApiLink(`https://api.rawg.io/api/games?key=e6ddcb78aeda4b678f21e8f6a97890cf&page_size=39&search=${inputVal}&page=1`)
    navigate("/")
    return navigate("/store");
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
                <button className="btn styleBtn" type="submit">Search</button>
              </form>
            </div>

        </div>
      </>
    )
  }
  
  export default HomePage
  