import React from 'react';
import {useState} from 'react';
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
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const submit = (e) => {
    e.preventDefault();
    resetHelperTexts();
    props.submitHandler(username, password);
  }

  const onUsernameChange = (value) => {
    setUsername(value)
    resetHelperTexts();
  }

  const onPasswordChange = (value) => {
    setPassword(value)
    resetHelperTexts();
  }

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
          Sign in
        </Typography>
        
        <form className={classes.form} onSubmit={submit}>
         <FormHelperText error className={classes.formerror}>
          {props.helperText.error}
        </FormHelperText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="text"
            autoComplete="username"
            autoFocus
            value={username}
            InputProps={{ inputProps: { minLength: 1} }}
            onChange={e=>onUsernameChange(e.target.value)}
            error={props.helperText.error!="" ? true : false}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            InputProps={{ inputProps: { minLength: 1} }}
            onChange={e=>onPasswordChange(e.target.value)}
            error={props.helperText.error!="" ? true : false}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
