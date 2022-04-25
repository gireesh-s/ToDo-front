import { Button, Container, createTheme, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'

let theme = createTheme();

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: "#919191",
    borderRadius:"10px",
    padding:"20px",
    paddingBottom:"40px",
    boxShadow: "#3b3b3b 0px 4px 12px 0px",
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
    backgroundColor:"#4a4a4a",
    textTransform:"none",
    "&:hover":{
      backgroundColor:"#3b3b3b"
    }
  }
})

const EditProfile = () => {

    const classes = useStyles();

    return (
        <Container className={classes.mainContainer}>
            <h1 style={{fontWeight: "1", color: "white"}}>Edit</h1>
          <form>
            <TextField
             variant='filled'
             fullWidth 
             size='small' 
             label='Name'
            //  value={name}
            //  onChange={handleChange("name")}
             className={classes.textField}
            />
            <TextField
             variant='filled'
             fullWidth 
             size='small' 
             label='Email'
            //  value={description}
            //  onChange={handleChange("description")}
             className={classes.textField}
            />
            <TextField
             variant='filled'
             fullWidth 
             size='small' 
             label='Mobile'
            //  value={location}
            //  onChange={handleChange("location")}
             className={classes.textField}
            />
            <Button
             type="submit"
             variant='contained' 
             className={classes.btn}
            //  onClick={clickSubmit}
            >Update</Button>
          </form>
        </Container>
      )
    }

export default EditProfile