/* eslint-disable react/prop-types */
import * as React from 'react';
import { Outlet} from "react-router-dom";
import {
  AppBar as MuiAppBar, Badge, Box, CssBaseline, Divider, Drawer as MuiDrawer,
  IconButton, List, Popover, Toolbar, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChevronLeft as ChevronLeftIcon, Info as InfoIcon, Menu as MenuIcon } from '@mui/icons-material';
import OffCanvas from "./Offcanvas.jsx"
import logoImage from "../assets/images/logo-v.png"
import DashboardListItems from './ListItems.jsx';



export default function Dashboard({cartBadgeNumber, gamesInCart, handleDelete, changeApiLink}) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };


  /* POPOVER STATES AND FUNCTIONS START*/
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopOver = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  /* POPOVER STATES AND FUNCTIONS END*/


  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            className='toolBar'
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <img className='dashBoardLogoImg' src={logoImage} alt="" />
              Vapor: The Ultimate Game Store
              
                <InfoIcon className="infoIcon" aria-describedby={id} variant="contained" onClick={handleClick}/>
              
              <Popover
                id={id}
                open={openPopOver}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <p className='popOverText'>This website is not a real game store and games on this website can not be purchased. Prices do not reflect their real retail prices, they are generated by an algorithm. On each game's page, however, are links to store pages where games can be purchased. At this stage, this project serves as a visual database for games and a convenient way to reach their store links.</p>
              </Popover>

            </Typography>


            
              <Badge className="offCanvasBadge" badgeContent={cartBadgeNumber} color="secondary">
                <OffCanvas 
                gamesInCart={gamesInCart}
                handleDelete={handleDelete}
                />
              </Badge>  
          
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <DashboardListItems
            changeApiLink ={changeApiLink}
            />
          </List>
        </Drawer>

         <Outlet /> 

      </Box>
  );
}




/* DASBOARD STYLING - MUI */
const drawerWidth = 230;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: '',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);