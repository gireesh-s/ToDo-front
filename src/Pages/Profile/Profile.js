import { Button, Container, Divider, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { display } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { API } from '../../config';
import { isAuthenticated } from '../Auth/SignIn/SignInAPI/signInAPI';
import { getToDoAPI } from '../Home/AddTodo/AddTodoApi/AddTodoApi';
import { ProfileAPI } from './ProfileAPI/ProfileAPI';

const useStyles = makeStyles({
  mainContainer: {
    marginTop:"5rem",
  },
  gridContainer: {
    width:"700px",
    margin:"auto",
    borderRadius:"25px",
    boxShadow: "#3b3b3b 0px 4px 9px 0px",
    backgroundColor:"white",
    padding:"50px 20px"
  },
  gridItem: {
    height: "auto",
    alignItems:"center",
    textAlign:"center",
    margin:"auto"
  }
})

const Profile = () => {

  const { token } = isAuthenticated();
  const userId = isAuthenticated().user._id;

  const [value, setValue] = useState([])
  const [toDoList, setToDoList] = useState([])

  const classes = useStyles();

  const readProfile = () => {
    ProfileAPI(userId,token)
    .then((res)=>{
      const { data } = res
      setValue(data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const getTodo = () => {
    getToDoAPI( userId, token )
    .then((res) => {
      const { data } = res;
      setToDoList(data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    readProfile();
    getTodo();
  },[]);

  return (
    <Container className={classes.mainContainer}>
      <Grid container className={classes.gridContainer}>
        <Grid item lg={6} sm={12} className={classes.gridItem}>
          <img src={`${API}/read/photo/${userId}`} alt="img" style={{objectFit:"cover", width:"300px", height:"300px", borderRadius:"25px",boxShadow: "#3b3b3b 0px 4px 9px 0px",}}/>
        </Grid>
        <Grid item lg={6} sm={12} className={classes.gridItem}>
          <Typography variant='h5' style={{color:"#fe8691"}}>{value.name}</Typography>
          <br/>
          <Typography>{value.email}</Typography>
          <Typography>{value.mobile}</Typography>
          <br/>
          <Divider/>
          <br/>
          <Typography><b>Number of ToDos Added : </b>{toDoList.length}</Typography>
          <br/>
          <Divider/>
          <br/>
          <Link to={`/edit/profile/${userId}`}>
            <Button variant='contained' color='secondary' style={{textTransform:"none"}}>Edit Profile</Button>
          </Link>
          <Link to={`/change/password/${userId}`}>
            <Button variant='contained' color='success' style={{textTransform:"none", marginLeft:"10px"}}>Change Password</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile