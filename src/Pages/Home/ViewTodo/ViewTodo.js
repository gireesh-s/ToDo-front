import { Box, Container, Grid, IconButton, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'

const theme = createTheme();

const useStyles = makeStyles({
  container: {
    width:"100%",
  },
  search: {
    margin:"0 0 10px 10px",
    backgroundColor:"#dedede",
  },
  box: {
    backgroundColor:"#dedede",
    width:"100%",
    borderRadius:"10px",
    padding:"10px",
    marginTop:"10px",
    boxShadow: "#3b3b3b 0px 4px 9px 0px",
  },
  title: {
    textAlign:"center",
    marginTop:"5px"
  },
  desc: {
    width:"100%",
    marginTop:"8px"
  },
  ldtContainer: {
    margin:"auto",
    display:"flex",
    marginTop:"8px",
  },
  dtContainer: {
    margin:"auto",
    display:"flex",
  }
})

const ViewTodo = () => {

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <TextField label="Search" variant='filled' size='small' fullWidth className={classes.search}/>
      <Box className={classes.box}>
        <Typography variant='h5' className={classes.title}>Title</Typography>
        <Typography variant='h6' className={classes.desc}>Description</Typography>
        <div className={classes.ldtContainer}>
          <Typography>Location</Typography>
          <div className={classes.dtContainer}>
            <Typography>Date</Typography>
            <Typography sx={{marginLeft:"10px"}}>Time</Typography>
          </div>
          <IconButton>
            <EditIcon/>
          </IconButton>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </div>
      </Box>
      {/* ---------------------------------------------------- */}
      <Box className={classes.box}>
        <Typography variant='h5' className={classes.title}>Title</Typography>
        <Typography variant='h6' className={classes.desc}>Description</Typography>
        <div className={classes.ldtContainer}>
          <Typography>Location</Typography>
          <div className={classes.dtContainer}>
            <Typography>Date</Typography>
            <Typography sx={{marginLeft:"10px"}}>Time</Typography>
          </div>
          <IconButton>
            <EditIcon/>
          </IconButton>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </div>
      </Box>
      {/* ------------------------------------------------------------ */}
    </Container>
  )
}

export default ViewTodo