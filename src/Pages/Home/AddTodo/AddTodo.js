import React, { useState } from 'react';
import Container from '@mui/material/Container'
import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { createTheme } from '@mui/system';
import { postToDoAPI } from './AddTodoApi/AddTodoApi';
import { isAuthenticated } from '../../Auth/SignIn/SignInAPI/signInAPI';

let theme = createTheme();

const useStyles = makeStyles({
  mainContainer: {
    // backgroundColor: "#f7a684",
    backgroundColor: "rgba(0,0,0, 0.4)",
    borderRadius:"10px",
    padding:"20px",
    paddingBottom:"40px",
    boxShadow: "#f7a684 0px 4px 12px 0px",
  },
  textField: {
    marginTop: "25px",
    backgroundColor:"white",
    borderRadius:"7px",
  },
  dateTimeTextField: {
    marginTop: "30px",
    backgroundColor:"white",
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
      backgroundColor:"#ff4b00",
    }
  }
})

const AddTodo = () => {

  const userId = isAuthenticated().user._id;
  const {token} = isAuthenticated();
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

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: "",
      [name]: event.target.value,
    })
  }

  const clickSubmit = (event) => {
    setValues({
      ...values,
      loading: true
    });
    postToDoAPI(userId, token, {
      title,
      description,
      date,
      time,
      location,
    }).then((res) => {
      console.log(res)
    }).catch((err)=>{
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
           backgroundColor:"white",
           height:"35px"
         }}
        >
          <legend
           style={{
             borderRadius:"8px",
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
             backgroundColor:"white"
           }}
          />
        </fieldset>
        <fieldset
         className={classes.textField}
         style={{
           borderRadius:"8px",
           backgroundColor:"white",
           height:"35px"
         }}
        >
          <legend
           style={{
             borderRadius:"8px",
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
             backgroundColor:"white"
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
         fullWidth
         className={classes.btn}
         onClick={clickSubmit}
        >Save ToDo</Button>
      </form>
    </Container>
  )
}

export default AddTodo