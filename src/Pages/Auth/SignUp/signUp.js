import { Button, Container, IconButton, InputAdornment, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState as UseState } from 'react';
import { useHistory as UseHistory } from "react-router-dom";
import './signUp.css'
import { signUpAPI } from './SignUpAPI/SignUpAPI';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const UseStyles = makeStyles({
  mainContainer: {
    backgroundColor: "#f7a684",
    borderRadius:"10px",
    padding:"20px",
    paddingBottom:"40px",
    boxShadow: "#f7a684 0px 4px 12px 0px",
  },
  textField: {
    marginTop: "30px",
    backgroundColor:"white",
    borderRadius:"7px",
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

const signUp = () => {

  const classes = UseStyles();
  const history = UseHistory();

  const [values, setValues] = UseState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    error: "",
    success: "",
    loading: false,
  });
  const { name, email, password, cpassword, error, success, loading } = values;

  const [showPassword, setShowPassword] = UseState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showCPassword, setShowCPassword] = UseState(false);
  const handleClickShowCPassword = () => setShowCPassword(!showCPassword);
  const handleMouseDownCPassword = () => setShowCPassword(!showCPassword);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: "",
      [name]:event.target.value,
    })
  }

  const register = (event) => {
    event.preventDefault();
    if( cpassword !== password ) {
      setValues({
        ...values,
        error: "Passwords does not match"
      })
      return error;
    };
    signUpAPI({name,email,password})
    .then((res) => {
      console.log(res);
      setValues({
        ...values,
        success: "Registered Successfully"
      })
      history.push('/signin')
    })
    .catch((err) => {
      console.log(err)
      setValues({
        ...values,
        error: err
      })
    })
  }

  return (
    <div className='signup-main-container'>
      <div className='signup-sub-container'>
    <Container className={classes.mainContainer}>
        <h1>Create an Account</h1>
      <form>
        <TextField
         variant='filled'
         fullWidth 
         size='small' 
         label='Name'
         value={name}
         onChange={handleChange("name")}
         className={classes.textField}
        />
        <TextField
         variant='filled'
         fullWidth 
         size='small' 
         label='Email'
         value={email}
         onChange={handleChange("email")}
         className={classes.textField}
        />
        <TextField
         variant='filled'
         fullWidth
         size='small' 
         label='Password'
         value={password}
         onChange={handleChange("password")}
         className={classes.textField}
         type={showPassword ? "text" : "password"} //password shown and hide
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
         variant='filled'
         fullWidth 
         size='small' 
         label='Confirm Password'
         value={cpassword}
         onChange={handleChange("cpassword")}
         className={classes.textField}
         type={showCPassword ? "text" : "password"} //password shown and hide
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCPassword}
                  onMouseDown={handleMouseDownCPassword}
                >
                  {showCPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
         type="submit"
         variant='contained' 
         fullWidth
         className={classes.btn}
         onClick={register}
        >Sign Up</Button>
      </form>
    </Container>
    </div>
    </div>
  )
}

export default signUp