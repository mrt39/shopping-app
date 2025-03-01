/* eslint-disable react/prop-types */
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GradeIcon from '@mui/icons-material/Grade';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import ExploreIcon from '@mui/icons-material/Explore';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';

//import utility functions
import { getThisYear } from '../utilities/utils';
import { getCategoryApiLink } from '../utilities/gameService';
import ListItemBtn from './ListItemsBtn';

export default function DashboardListItems({ changeApiLink }) { 
  const navigate = useNavigate();
  

  //handle category selection and navigation
  function handleClick(categoryName) {
    //get the API link for the selected category
    const apiLink = getCategoryApiLink(categoryName);
    //update API link and navigate to store page
    changeApiLink(apiLink);
    navigate("/");
    return navigate("/shopping-app/store");
  }

  // SVG icon components
  const ShooterIcon = () => {
    return (
      <svg width="30px" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#dcdedf"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#dcdedf" d="M79.238 115.768l-28.51 67.863h406.15l-.273-67.862h-263.83v55.605h-15v-55.605h-16.68v55.605H146.1v-55.605h-17.434v55.605h-15v-55.605H79.238zm387.834 15.96v40.66h18.688v-40.66h-18.688zM56.768 198.63l20.566 32.015L28.894 406.5l101.68 7.174 21.54-97.996h115.74l14.664-80.252 174.55-3.873-.13-32.922H56.767zM263.44 235.85l-11.17 61.142h-96.05l12.98-59.05 12.53-.278-2.224 35.5 14.262 13.576 1.003-33.65 24.69-16.264 43.98-.976z"></path></g></svg>
    );
  };
  
  const StrategyIcon = () => {
    return (
      <svg fill="#dcdedf" height="26px" width="26px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 296.999 296.999" xmlSpace="preserve" stroke="#dcdedf"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M226.983,260.96c-1.498-4.201-5.476-7.007-9.936-7.007H57.231c-5.099,0-9.468,3.648-10.378,8.666l-4.773,26.333 c-0.218,1.204-0.173,2.458,0.247,3.607c1.005,2.749,3.556,4.44,6.306,4.44h181.553c1.363,0,2.726-0.345,3.854-1.109 c2.648-1.794,3.598-5.022,2.599-7.826L226.983,260.96z"></path> <path d="M253.923,113.07L202.42,35.815l9.914-26.804c0.873-2.361,0.347-5.013-1.362-6.861c-1.71-1.851-4.314-2.584-6.733-1.896 l-48.56,13.733c-4.755-0.085-22.575,0.281-42.344,9.337c-20.892,9.57-47.981,30.99-58.39,78.68 c-14.367,65.826-0.383,116.08,8.295,138.569h137.528l12.276-12.276c2.226-2.227,2.598-5.703,0.895-8.351 c-11.321-17.596-38.038-61.909-48.365-89.48c3.783,1.293,8.071,2.127,12.604,1.89c6.445-0.337,12.327-2.696,17.551-7.028 l18.855,12.571c5.825,3.884,13.047,5.081,19.815,3.284s12.445-6.42,15.577-12.683l4.365-8.729 C255.415,117.625,255.255,115.067,253.923,113.07z M181.616,70.076h-9.094c-3.695,0-6.689-2.995-6.689-6.689 c0-3.695,2.995-6.689,6.689-6.689h9.094c3.695,0,6.689,2.995,6.689,6.689C188.305,67.082,185.311,70.076,181.616,70.076z"></path> </g> </g> </g> </g></svg>
    );
  };
  
  return (
    <React.Fragment>
      {/*main navigation items */}
      <ListItemBtn 
        icon={<HomeIcon />} 
        text="Home" 
        to="/shopping-app" 
      />
      
      <ListItemBtn 
        icon={<SportsEsportsIcon />} 
        text="Store" 
        to="store" 
      />
      
      <ListItemBtn 
        icon={<ShoppingCartIcon />} 
        text="Cart" 
        to="cart" 
      />

      {/*featured games accordion */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ListSubheader className="storeDivident" component="div" inset>
            <SportsEsportsIcon /> 
          </ListSubheader>
        </AccordionSummary>

        <AccordionDetails>
          <ListItemBtn 
            icon={<BarChartIcon />} 
            text="Highest Rated" 
            onClick={() => handleClick("highestRated")} 
          />

          <ListItemBtn 
            icon={<GradeIcon />} 
            text="Most Popular" 
            onClick={() => handleClick("mostPopular")} 
          />

          <ListItemBtn 
            icon={<SwitchAccessShortcutIcon />} 
            text="New Releases" 
            onClick={() => handleClick("newReleases")} 
          />

          <ListItemBtn 
            icon={<EmojiEventsIcon />} 
            text={`Best of ${getThisYear()}`} 
            onClick={() => handleClick("bestOfYear")} 
          />
        </AccordionDetails>

        {/*game genres accordion */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListSubheader className="storeDivident" component="div" inset>
              <LayersIcon />
            </ListSubheader>
          </AccordionSummary>

          <AccordionDetails>
            <ListItemBtn 
              icon={<WhatshotIcon />} 
              text="Action" 
              onClick={() => handleClick("action")} 
            />

            <ListItemBtn 
              icon={<ShooterIcon />} 
              text="Shooter" 
              onClick={() => handleClick("shooter")} 
            />

            <ListItemBtn 
              icon={<StrategyIcon />} 
              text="Strategy" 
              onClick={() => handleClick("strategy")} 
            />

            <ListItemBtn 
              icon={<TheaterComedyIcon />} 
              text="RPG" 
              onClick={() => handleClick("rpg")} 
            />

            <ListItemBtn 
              icon={<ExploreIcon />} 
              text="Adventure" 
              onClick={() => handleClick("adventure")} 
            />
          </AccordionDetails>
        </Accordion>
      </Accordion>
    </React.Fragment>
  );
}