import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function DashboardListItems({changeApiLink}) { 

  const navigate = useNavigate();
    
  function handleClick(categoryName){

    var apiLink = ""
    //change the api link according to the button clicked
    if (categoryName ==="highestRated") {
      apiLink = `https://api.rawg.io/api/games?key=e6ddcb78aeda4b678f21e8f6a97890cf&page_size=39&ordering=-metacritic&page=1`
    }
    if (categoryName ==="mostPopular") {
      apiLink = `https://api.rawg.io/api/games?key=e6ddcb78aeda4b678f21e8f6a97890cf&page_size=39&ordering=-rating&page=1`
    }
    if (categoryName ==="bestOf2023") {
      apiLink = `https://api.rawg.io/api/games?key=e6ddcb78aeda4b678f21e8f6a97890cf&page_size=39&ordering=-metacritic&dates=2023-01-01,2023-12-12&page=1`
    }
    if (categoryName ==="action") {
      apiLink = `https://api.rawg.io/api/games?key=e6ddcb78aeda4b678f21e8f6a97890cf&page_size=39&ordering=-metacritic&genres=action&page=1`
    }
    if (categoryName ==="shooter") {
      apiLink = `https://api.rawg.io/api/games?key=e6ddcb78aeda4b678f21e8f6a97890cf&page_size=39&ordering=-metacritic&genres=shooter&page=1`
    }
    if (categoryName ==="strategy") {
      apiLink = `https://api.rawg.io/api/games?key=e6ddcb78aeda4b678f21e8f6a97890cf&page_size=39&ordering=-metacritic&genres=strategy&page=1`
    }
    if (categoryName ==="rpg") {
      apiLink = `https://api.rawg.io/api/games?key=e6ddcb78aeda4b678f21e8f6a97890cf&page_size=39&ordering=-metacritic&genres=role-playing-games-rpg&page=1`
    }
    if (categoryName ==="adventure") {
      apiLink = `https://api.rawg.io/api/games?key=e6ddcb78aeda4b678f21e8f6a97890cf&page_size=39&ordering=-metacritic&genres=adventure&page=1`
    }

    changeApiLink(apiLink)
    navigate("/");
    return navigate("/store");
  }
  
  return (
  <React.Fragment >
    <div className='mainListItem'>
      <Link to="">
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </Link>
    </div>

    <div className='mainListItem'>
    <Link to="store">
      <ListItemButton>
        <ListItemIcon>
          <SportsEsportsIcon />
        </ListItemIcon>
        <ListItemText primary="Store" />
      </ListItemButton>
    </Link>
    </div>

    <div className='mainListItem'>
    <Link to="cart">
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Cart" />
      </ListItemButton>
    </Link>
    </div>



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
          <ListItemButton onClick={() => handleClick("highestRated")}>
            <ListItemIcon >
              <BarChartIcon  />
            </ListItemIcon>
            <ListItemText primary="Highest Rated" />
          </ListItemButton>

          <ListItemButton onClick={() => handleClick("mostPopular")}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Most Popular" />
          </ListItemButton>

          <ListItemButton onClick={() => handleClick("bestOf2023")}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Best of 2023" />
          </ListItemButton>
        </AccordionDetails>

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
            <ListItemButton onClick={() => handleClick("action")}>
              <ListItemIcon >
                <BarChartIcon  />
              </ListItemIcon>
              <ListItemText primary="Action" />
            </ListItemButton>

            <ListItemButton onClick={() => handleClick("shooter")}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Shooter" />
            </ListItemButton>

            <ListItemButton onClick={() => handleClick("strategy")}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Strategy" />
            </ListItemButton>

            <ListItemButton onClick={() => handleClick("rpg")}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="RPG" />
            </ListItemButton>

            <ListItemButton onClick={() => handleClick("adventure")}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Adventure" />
            </ListItemButton>
          </AccordionDetails>
        </Accordion>
      </Accordion>



  </React.Fragment>

  );
}