import React from 'react';
import {TextField,Grid,Avatar,Typography,Container,Button, FormControlLabel, Box ,CssBaseline, Link, Checkbox, FormHelperText } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    }, 
  },
   paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    padding: "14px 22px",
    fontSize: "1.1rem",
  },
  formerror:{
    textAlign: "center",
    fontSize: "1.1rem",
    minHeight: "39px"
  }
}));

export default function ValidationTextFields(props) {
  const classes = useStyles();
  const logout = () => {
    resetHelperTexts();
    props.logginHandler(false)};
  const resetHelperTexts = () =>{
    props.helperText.error="";
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Profile
        </Typography>
        <form className={classes.form} noValidate>
        <FormHelperText error className={classes.formerror}>
          {props.helperText.error}
        </FormHelperText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            disabled
            value={props.user.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="text"
            id="username"
            InputProps={{ inputProps: { minLength: 3, maxLength: 15 } }}
            helperText=""
            disabled
            value={props.user.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="contact"
            label="Contact"
            type="text"
            id="contact"
            InputProps={{ inputProps: { minLength: 10, maxLength: 10 } }}
            helperText=""
            disabled
            value={props.user.contact}
          />
          { props.loggedin && (
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            onClick={logout}
          >
            Logout
          </Button>
          )}
          {!props.loggedin && (
          <Grid container justify="space-between">
            <Grid item >
              <Link href="/login" variant="body2">
                {"Sign in"}
              </Link>
            </Grid>
             <Grid item>
              <Link href="/register" variant="body2">
                 {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
          )}
        </form>
      </div>
    </Container>
  );
}
