import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container'
import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { createTheme } from '@mui/system';
import { putToDoAPI, readToDoAPI } from './EditTodoAPI/EditTodoAPI';
import { isAuthenticated } from '../Auth/SignIn/SignInAPI/signInAPI';

let theme = createTheme();

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    borderRadius:"10px",
    padding:"20px",
    paddingBottom:"40px",
    boxShadow: "#3b3b3b 0px 4px 12px 0px",
    marginTop:"5rem"
  },
  textField: {
    marginTop: "30px",
    backgroundColor:"#ebebeb",
    borderRadius:"7px",
  },
  dateTimeTextField: {
    marginTop: "30px",
    backgroundColor:"#ebebeb",
    borderRadius:"7px",
    width:"48.1%",
    [theme.breakpoints.down('xl')]: {
      width: "100%"
    }
  },
  btn: {
    marginTop: "30px",
    height:"3rem",
    borderRadius:"7px",
    backgroundColor:"#dd4100",
    textTransform:"none",
    "&:hover":{
      backgroundColor:"#ff4b00"
    }
  }
})

const EditTodo = (props) => {

  const { history } = props
  const { token } = isAuthenticated();
  const userId = isAuthenticated().user._id;
  const todoId = props.match.params.todoId
  console.log(todoId)
  const [values, setValues] = useState({
    title: "",
    description: "",
    date: '',
    time: '',
    location: "",
    error: "",
    success: "",
    loading: false
  })
  const { title, description, date, time, location, error, success, loading } = values;
  const classes = useStyles();

  const getTodo = () => {
    readToDoAPI( userId, todoId, token )
    .then((res) => {
      const { data } = res;
      setValues(data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getTodo();
  },[]);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: "",
      [name]: event.target.value,
    })
  }

  const clickSubmit = (e) => {
      e.preventDefault()
    setValues({
      ...values,
      loading: true
    });
    putToDoAPI(userId, todoId, token, {
      title,
      description,
      date,
      time,
      location,
    }).then((res) => {
      console.log(res);
      history.push("/")
    })
    .catch((err)=> {
        console.log(err)
    })
  }

  return (
    <Container className={classes.mainContainer}>
      <form>
        <TextField
         variant='filled'
         fullWidth 
         size='small' 
         label='Title'
         value={title}
         onChange={handleChange("title")}
         className={classes.textField}
        />
        <TextField
         variant='filled'
         fullWidth 
         size='small' 
         label='Description'
         multiline
         rows={4}
         value={description}
         onChange={handleChange("description")}
         className={classes.textField}
        />
        <fieldset
         className={classes.textField}
         style={{
           borderRadius:"8px",
           backgroundColor:"#fff1f9"
         }}
        >
          <legend
           style={{
             borderRadius:"8px",
             paddingTop:"10px",
             fontSize:"12px",
             fontFamily:"sans-serif"
           }}
          >
            Date
          </legend>
          <input 
           type='date'
           value={date}
           onChange={handleChange("date")}
           style={{
             fontFamily:"sans-serif",
             fontSize:"15px",
             padding:"5px",
             width:"100%", 
             border:"0",
             backgroundColor:"#fff1f9"
           }}
          />
        </fieldset>
        <fieldset
         className={classes.textField}
         style={{
           borderRadius:"8px",
           backgroundColor:"#fff1f9"
         }}
        >
          <legend
           style={{
             borderRadius:"8px",
             paddingTop:"10px",
             fontSize:"12px",
             fontFamily:"sans-serif"
           }}
          >
            Time
          </legend>
          <input 
           type='time'
           value={time}
           onChange={handleChange("time")}
           style={{
             fontFamily:"sans-serif",
             fontSize:"15px",
             padding:"5px",
             width:"100%", 
             border:"0",
             backgroundColor:"#fff1f9"
           }}
          />
        </fieldset>
        <TextField
         variant='filled'
         fullWidth 
         size='small' 
         label='Location'
         value={location}
         onChange={handleChange("location")}
         className={classes.textField}
        />
        <Button
         type="submit"
         variant='contained' 
         className={classes.btn}
         onClick={clickSubmit}
        >Update ToDo</Button>
      </form>
    </Container>
  )
}

export default EditTodo