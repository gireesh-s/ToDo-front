import { Button, Container, createTheme, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react'
import { isAuthenticated } from '../../Auth/SignIn/SignInAPI/signInAPI';
import { updatePasswordAPI } from './ChangePasswordAPI/ChangePasswordAPI';

let theme = createTheme();

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: "#f7a684",
    borderRadius:"10px",
    padding:"20px",
    paddingBottom:"40px",
    boxShadow: "#f7a684 0px 4px 12px 0px",
    marginTop:"5rem",
    width:"50%"
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

const ChangePassword = (props) => {

  const { history } = props
  const { token } = isAuthenticated();
  const userId = props.match.params.userId;
  const email = isAuthenticated().user.email;

  const classes = useStyles();

  const [value, setValue] = useState({
      password: "",
      newPassword: "",
      confirmNewPassword: ""
  })

  const { password, newPassword, confirmNewPassword } = value;

  const handleChange = (name) => (event) => {
      setValue({
          ...value,
          [name]: event.target.value
      })
  }

  const updatePassword = () => {
      updatePasswordAPI(userId, token, {
          email,
          password,
          newPassword
      }).then((res)=>{
          console.log(res)
          history.push(`/profile/${userId}`)
      }).catch((err)=>{
          console.log(err)
      })
  }

  return (
    <Container className={classes.mainContainer}>
        <h1 style={{fontWeight: "1", color: "white"}}>Change Password</h1>
        <form>
            <TextField
                variant='filled'
                fullWidth 
                size='small' 
                label='Current Password'
                value={password}
                onChange={handleChange("password")}
                className={classes.textField}
            />
            <TextField
                variant='filled'
                fullWidth 
                size='small' 
                label='New Password'
                value={newPassword}
                onChange={handleChange("newPassword")}
                className={classes.textField}
            />
            <TextField
                variant='filled'
                fullWidth 
                size='small' 
                label='Confirm New Password'
                value={confirmNewPassword}
                onChange={handleChange("confirmNewPassword")}
                className={classes.textField}
            />
            <Button
                type="submit"
                variant='contained' 
                className={classes.btn}
                onClick={updatePassword}
            >Save</Button>
        </form>
    </Container>
  )
}

export default ChangePassword