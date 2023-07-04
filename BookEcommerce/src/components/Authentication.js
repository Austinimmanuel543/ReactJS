import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import{ CssBaseline,CircularProgress }from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';
import fire from '../Firebase';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router'


function Authentication(props) {
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  console.log("Mounting");
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading]=useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fire.auth.signInWithEmailAndPassword(email, password).then(userCredentials => {

      localStorage.setItem('user', JSON.stringify({
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
        refreshToken: userCredentials.user.refreshToken
      }))
      setLoading(false);
      props.setUser(userCredentials.user);
      history.replace('/')
      props.handleAuth();
    }).catch(err => {
      setError(err);
      setLoading(false);
    })
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
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox 
              value={remember} 
              onChange={(e) => setRemember(!remember)} 
              color="primary" />}
            label="Remember me"
          />
          { loading? 
            <CircularProgress/> :
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
              Sign In
            </Button>}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {

        Object.keys(error).length !== 0 && (<Alert severity="error">{error.message}</Alert>)

      }
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default Authentication;