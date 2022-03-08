import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import AddReactionIcon from '@mui/icons-material/AddReaction';

const Header = () => {
  return (
    <AppBar sx={{backgroundColor:"#4a4a4a"}}>
        <Toolbar>
            <AddReactionIcon sx={{margin:"7px",display:{xl:"block",lg:"block",sm:"block",xs:"none"}}}/>
            <Typography variant='h5'>ToDo</Typography>
        </Toolbar>
    </AppBar>
  )
}

export default Header