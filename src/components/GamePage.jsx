import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Carousel from "./Carousel.jsx"


export default function MaxWidthDialog({gamePageOpen, setGamePageOpen, gameID, gameScreenshots}) {


  const handleClose = () => {
    setGamePageOpen(false);
  };



  return (
    <React.Fragment>

      <Dialog
        open={gamePageOpen}
        onClose={handleClose}
        className='gamePageDialogBox'
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
        <Carousel
        gameScreenshots={gameScreenshots}
        />
        <p>{gameID.gameID}</p>
        {/* <p>{ gameScreenshots.gameScreenshots }</p> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}