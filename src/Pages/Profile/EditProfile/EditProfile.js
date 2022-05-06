import { Button, Container, createTheme, Icon, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../Auth/SignIn/SignInAPI/signInAPI';
import { ProfileAPI } from '../ProfileAPI/ProfileAPI';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import './EditProfile.css'
import { updateProfileAPI } from './EditProfileAPI/EditProfileAPI';

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

const EditProfile = () => {

    const classes = useStyles();

    const { token } = isAuthenticated();
    const userId = isAuthenticated().user._id;
  
    const [value, setValue] = useState({
      name: "",
      email: "",
      mobile: "",
    })

    const { name, email, mobile } = value

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

    useEffect(()=>{
      readProfile();
    },[]);

    const handleChange = (name) => (event) => {
      setValue({
        ...value,
        error: "",
        [name]: event.target.value,
      })
    }

    const updateProfile = (e) => {
      e.preventDefault();
      updateProfileAPI(userId, token, {
        name,
        email,
        mobile
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err);
      })
    }

    return (
        <Container className={classes.mainContainer}>
          <h1 style={{fontWeight: "1", color: "white"}}>Edit</h1>
          <form onSubmit={updateProfile}>
            <p>
              <center>
                <input type="file" id='upload' accept='image/*' style={{display:"none"}}/>
                <label for="upload">
                  <div className='ep-avatar-container'>
                    <i class="fa-solid fa-user" style={{fontSize:"3rem", color:"gray"}}></i>
                  </div>
                </label>
              </center>
            </p>
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
             label='Mobile'
             value={mobile}
             onChange={handleChange("mobile")}
             className={classes.textField}
            />
            <Button
             type="submit"
             variant='contained' 
             className={classes.btn}
            >Update</Button>
          </form>
        </Container>
      )
    }

export default EditProfile