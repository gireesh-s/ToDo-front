import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { isAuthenticated, signoutApi } from '../../Pages/Auth/SignIn/SignInAPI/signInAPI';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom'

const Header = ({history}) => {

  const [name, setName] = useState("")

  useEffect(() => {
    if(isAuthenticated()) {
      setName(isAuthenticated().user.name)
    }
  }, [])
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar sx={{backgroundColor:"#4a4a4a"}}>
          <Toolbar>
              <AddReactionIcon sx={{margin:"7px",display:{xl:"block",lg:"block",sm:"block",xs:"none"}}}/>
              <Typography variant='h5' style={{flexGrow:"1"}}>ToDo</Typography>
              <AccountCircleIcon/>
              { name && (<Typography>{name}</Typography>) }
              <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              >
                <ArrowDropDownIcon style={{color:"white"}}/>
              </IconButton>
          </Toolbar>
      </AppBar>
      <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Link to={`/profile/${isAuthenticated().user._id}`} style={{color:"black"}}>
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
      </Link>
      <Divider />
      <MenuItem onClick={()=>signoutApi(()=>history.push("/signin"))}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  </>
  )
}

export default Header