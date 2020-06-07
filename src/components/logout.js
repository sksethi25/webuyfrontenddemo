import React from 'react';
import {TextField,Grid,Avatar,Typography,Container,Button, FormControlLabel, Box ,CssBaseline, Link, Checkbox } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";

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
}));

export default function ValidationTextFields(props) {
  const classes = useStyles();
  const history = useHistory();
  const viewpProfile = () => history.push('/profile');
  const logout = () => props.logginHandler(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome User
        </Typography>
        <form className={classes.form} noValidate>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            onClick={viewpProfile}
          >
           View Profile
          </Button>
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
        </form>
      </div>
    </Container>
  );
}
