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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');

  const submit = (e) => {
     e.preventDefault();
     resetHelperTexts();
    props.submitHandler(email, password, username, contact);
  }

   const onUsernameChange = (value) => {
    setUsername(value)
    resetHelperTexts();
  }

  const onPasswordChange = (value) => {
    setPassword(value)
    resetHelperTexts();
  }

  const onEmailChange = (value) => {
    setEmail(value)
    resetHelperTexts();
  }
   const onContactChange = (value) => {
    setContact(value)
    resetHelperTexts();
  }

  const resetHelperTexts = () =>{
    props.helperText.error="";
    props.helperText.email="";
    props.helperText.password="";
    props.helperText.username="";
    props.helperText.contact="";
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e=>onEmailChange(e.target.value)}
            helperText={props.helperText.email}
            error={props.helperText.email!="" ? true : false}
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
            InputProps={{ inputProps: { minLength: 3, maxLength: 15 } }}
            helperText="It should be between 3 and 15 characters"
            value={password}
            onChange={e=>onPasswordChange(e.target.value)}
            helperText={props.helperText.password}
            error={props.helperText.password!="" ? true : false}
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
            helperText="It should be between 3 and 15 characters"
            value={username}
            onChange={e=>onUsernameChange(e.target.value)}
            helperText={props.helperText.username}
            error={props.helperText.username!="" ? true : false}
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
            helperText="It should be of 10 numbers"
             value={contact}
            onChange={e=>onContactChange(e.target.value)}
            helperText={props.helperText.contact}
            error={props.helperText.contact!="" ? true : false}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
