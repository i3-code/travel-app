import React, { useState } from 'react';
import useStyles from './style';

import { Backdrop, Box } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function RatingTable({handleClose}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const closeBlockHandler = () => {
    setOpen(false);
    handleClose(false)
  };

  return(
    <Backdrop className={classes.backdrop} open={open} >
      <IconButton
        aria-label="close"
        color="inherit"
        className={classes.closeIcon}
        onClick={closeBlockHandler}
      >
        <CloseIcon />
      </IconButton>
        <Box>Rating</Box>
    </Backdrop>
  )
}
