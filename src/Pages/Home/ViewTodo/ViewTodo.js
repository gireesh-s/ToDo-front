import { Box, CircularProgress, Container, IconButton, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react'
import { deleteToDoAPI, getToDoAPI } from '../AddTodo/AddTodoApi/AddTodoApi';
import { isAuthenticated } from '../../Auth/SignIn/SignInAPI/signInAPI';
import moment from 'moment'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    width:"100%",
  },
  search: {
    margin:"0 0 10px 10px",
    backgroundColor:"white",
  },
  boxContainer: {
    height:"520px",
    overflow:"hidden",
    display:"inherit",
    position:"relative",
    transition: "transform 0.5s ease-out 0s",
    overflowY:"auto",
    paddingBottom:"25px"
  },
  box: {
    backgroundColor:"#ffb393",
    width:"100%",
    borderRadius:"10px",
    padding:"10px",
    marginTop:"10px",
    boxShadow: "#f7a684 0px 4px 9px 0px",
    color:"black"
  },
  title: {
    textAlign:"center",
    marginTop:"5px",
    fontSize:"1.3rem"
  },
  desc: {
    width:"100%",
    marginTop:"8px",
    fontSize:"1rem"
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

  const { token } = isAuthenticated();
  const userId = isAuthenticated().user._id
  const [toDoList, setToDoList] = useState([])
  const [loading, setLoading] = useState(false)
  const classes = useStyles();

  const getTodo = () => {
    setLoading(true)
    getToDoAPI( userId, token )
    .then((res) => {
      const { data } = res;
      setToDoList(data)
    })
    .catch((err)=>{
      console.log(err)
    })
    setLoading(false)
  }

  useEffect(() => {
    getTodo();
  }, [])

  const deleteToDo = (todoId) => {
    deleteToDoAPI(userId, todoId, token)
    .then((res)=>{
      console.log(res)
      getTodo();
    })
  }

  return (
    <Container className={classes.container}>
      <TextField label="Search" variant='filled' size='small' fullWidth className={classes.search}/>
      <Container className={classes.boxContainer}>
      {
        loading?
        (
          <Container>
            <CircularProgress color="secondary" />
          </Container>
        )
        :
          toDoList.map((value)=>{
            let formattedDate = moment(value.date).format('DD/MM/YYYY')
            return (
              <Box className={classes.box}>
                <Typography variant='h5' className={classes.title}>{value.title}</Typography>
                <Typography variant='h6' className={classes.desc}>{value.description}</Typography>
                <div className={classes.ldtContainer}>
                  <Typography>{value.location}</Typography>
                  <div className={classes.dtContainer}>
                    <Typography>{formattedDate}</Typography>
                    <Typography sx={{marginLeft:"10px"}}>{value.time}</Typography>
                  </div>
                  <Link to={`/edit/${value._id}/${userId}`}>
                    <IconButton>
                      <EditIcon/>
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() => deleteToDo(value._id)}
                  >
                    <DeleteIcon/>
                  </IconButton>
                </div>
              </Box>
            )
          })
      }
      </Container>
    </Container>
  )
}

export default ViewTodo