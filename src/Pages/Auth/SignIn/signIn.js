import { Button, Container, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles'
import React, { useState as UseState } from 'react'
import { Redirect } from "react-router";
import './signIn.css'
import { clearJwt, signInAPI, userAuth } from './SignInAPI/signInAPI';

const UseStyles = makeStyles({
    mainContainer: {
      backgroundColor: "#919191",
      borderRadius:"10px",
      padding:"20px",
      paddingBottom:"40px",
      boxShadow: "#3b3b3b 0px 4px 12px 0px",
    },
    textField: {
      marginTop: "30px",
      backgroundColor:"#ebebeb",
      borderRadius:"7px",
    },
    btn: {
      marginTop: "30px",
      height:"3rem",
      borderRadius:"7px",
      backgroundColor:"#4a4a4a",
      textTransform:"none",
      "&:hover":{
        backgroundColor:"#3b3b3b"
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
    <Container className={classes.mainContainer}>
        <h1>Login</h1>
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