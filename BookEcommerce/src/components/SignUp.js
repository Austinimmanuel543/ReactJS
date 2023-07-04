import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';
import useSignUpForm from '../hooks/useSignUpForm';
import useErrorField from '../hooks/useErrorField'
import { Alert } from '@material-ui/lab';
import fire from '../Firebase';
import RingLoader from "react-spinners/RingLoader";
const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [error, handleError] = useErrorField();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const signup = () => {
    setLoading(true);
    fire.auth.createUserWithEmailAndPassword(input.email, input.password).then(userCredentials => {
      if (userCredentials) {
        const signedUpUser = userCredentials.user;
        signedUpUser.updateProfile({
          displayName: input.firstName + " " + input.lastName
        }).then(() => {
          setMessage("User Created Login To Continue !");
          setLoading(false);
        })
      }
    }).catch(err => {
      handleError(err.message);
      setLoading(false);
    })
  }
  const { input, handleSubmit, handleInputChange } = useSignUpForm(signup);
  const css = {
    display: 'block',
    margin: '0 auto'
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
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                onChange={handleInputChange}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                onChange={handleInputChange}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                onChange={handleInputChange}
                label="Email Address"
                name="email"

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                onChange={handleInputChange}
                label="Password"
                type="password"
                id="password"

              />
            </Grid>

          </Grid>
          {loading ?
            <RingLoader color={'blue'} loading={loading} css={css} size={150} />
            : <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
         </Button>}
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>

      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}