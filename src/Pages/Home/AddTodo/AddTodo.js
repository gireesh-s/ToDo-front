import React from 'react';
import Container from '@mui/material/Container'
import { makeStyles } from '@mui/styles';
import { Button, TextField, Typography } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import { createTheme } from '@mui/system';

let theme = createTheme();

const useStyles = makeStyles({
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

const AddTodo = () => {

  const [value, setValue] = React.useState(new Date());
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <form>
        <TextField
         variant='filled'
         fullWidth 
         size='small' 
         label='Title'
         className={classes.textField}
        />
        <TextField
         variant='filled'
         fullWidth 
         size='small' 
         label='Description'
         multiline
         rows={4}
         className={classes.textField}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            openTo="year"
            views={['year', 'month', 'day']}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => 
              <TextField {...params} 
               className={classes.dateTimeTextField}
               variant="filled"
               fullWidth
              />
            }
          />
          <TimePicker
          
            label="Time"
            value={value}
            onChange={setValue}
            renderInput={(params) => 
              <TextField {...params} 
               className={classes.dateTimeTextField}
               variant="filled"
               fullWidth
               sx={{marginLeft:{xl:"20px",lg:"0px"}}}
              />
            }
          />
        </LocalizationProvider>
        <TextField
         variant='filled'
         fullWidth 
         size='small' 
         label='Location'
         className={classes.textField}
        />
        <Button
         variant='contained' 
         fullWidth
         className={classes.btn}
        >Save ToDo</Button>
      </form>
    </Container>
  )
}

export default AddTodo