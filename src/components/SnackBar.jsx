/* eslint-disable react/prop-types */
import { Transition } from 'react-transition-group';
import { styled } from '@mui/system';
import { CheckRounded as CheckRoundedIcon, Close as CloseIcon } from '@mui/icons-material';
import { Snackbar } from '@mui/base';
import { useState, useRef } from 'react'



export default function SnackBarComp({setOpen, open}) {

    const [exited, setExited] = useState(true);
    const nodeRef = useRef(null);
  
    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
    
    
    const handleOnEnter = () => {
        setExited(false);
    };
    
    const handleOnExited = () => {
        setExited(true);
    };


    return (
        <StyledSnackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        exited={exited}
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={open}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <SnackbarContent
              style={{
                transform: positioningStyles[status],
                transition: 'transform 300ms ease',
              }}
              ref={nodeRef}
            >
              <CheckRoundedIcon
                sx={{
                  color: 'success.main',
                  flexShrink: 0,
                  width: '1.25rem',
                  height: '1.5rem',
                }}
              />
              <div className="snackbar-message">
                <p className="snackbar-title">Game Added!</p>
                <p className="snackbar-description">
                  Game successfully added to the cart.
                </p>
              </div>
              <CloseIcon onClick={handleClose} className="snackbar-close-icon" />
            </SnackbarContent>
          )}
        </Transition>
      </StyledSnackbar>

    )


}


/* SNACKBAR STYLING - MUI*/
const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };
    
  const StyledSnackbar = styled(Snackbar)`
    position: fixed;
    z-index: 5500;
    display: flex;
    bottom: 62px;
    right: 16px;
    max-width: 560px;
    min-width: 300px;
  `;
  
  const SnackbarContent = styled('div')(
    ({ theme }) => `
    display: flex;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: ${
      theme.palette.mode === 'dark'
        ? `0 2px 16px rgba(0,0,0, 0.5)`
        : `0 2px 16px ${grey[200]}`
    };
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
  
    & .snackbar-message {
      flex: 1 1 0%;
      max-width: 100%;
    }
  
    & .snackbar-title {
      margin: 0;
      line-height: 1.5rem;
      margin-right: 0.5rem;
    }
  
    & .snackbar-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
    }
  
    & .snackbar-close-icon {
      cursor: pointer;
      flex-shrink: 0;
      padding: 2px;
      border-radius: 4px;
  
      &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      }
    }
    `,
  );
  
  const positioningStyles = {
    entering: 'translateX(0)',
    entered: 'translateX(0)',
    exiting: 'translateX(500px)',
    exited: 'translateX(500px)',
    unmounted: 'translateX(500px)',
  };
  
  
  