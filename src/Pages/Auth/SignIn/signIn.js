import { Button, Container, IconButton, InputAdornment, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles'
import React, { useState as UseState } from 'react'
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './signIn.css'
import { clearJwt, signInAPI, userAuth } from './SignInAPI/signInAPI';

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

const signIn = () => {

    const classes = UseStyles();
    const [values, setValues] = UseState({
        email: "",
        password: "",
        error: "",
        success: "",
        loading: false,
        redirectTo: false,
    });

    const { email, password, error, success, loading, redirectTo } = values;

    const [showPassword, setShowPassword] = UseState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleChange = (name) => (event) => {
      setValues({
        ...values,
        error: false,
        [name]: event.target.value,
      });
    };

    const signIn = (event) => {
      event.preventDefault();
      if (!email && !password) {
        setValues({
          ...values,
          error: "Please enter a valid email and password",
        });
        return false;
      }
      setValues({
        ...values,
        loading: true,
      });
      signInAPI({ email, password }).then((res) => {
        if (res) {
          if (res.response) {
            console.log(res.response);
            setValues({
              ...values,
              error: res.response.data.error,
            });
          } else {
            console.log(res.data);
            const { data } = res
            userAuth( data, () => {
              setValues({
              ...values,
              redirectTo: true
              })
            })
          }
        }
      });
    }

    const redirectUser = () => {
      if (redirectTo) {
        return <Redirect to="/" />;
      }
    };

  return (
    <div className='signin-main-container'>
      <div className='signin-sub-container'>
        Enter <b> Email: user11@gmail.com </b> & <b> Password: user11 </b> for your reference
    <Container className={classes.mainContainer}>
        <h1>Login</h1>
        <Link to={'/signup'} style={{float:"right", color:"black", textDecoration:"underline"}}>Create New Account</Link>
        {redirectUser()}
      <form>
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
        <Button
         type="submit"
         variant='contained' 
         fullWidth
         className={classes.btn}
         onClick={signIn}
        >Sign In</Button>
      </form>
    </Container>
    </div>
    </div>
  )
}

export default signIn