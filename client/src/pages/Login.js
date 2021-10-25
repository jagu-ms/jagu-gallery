import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { AuthContainer } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import Auth from "../Auth";



const useStyles = makeStyles((theme) => ({
    
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Signup() {
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    /* const [loading, setLoading] = useState(false) */
    const [hasError, setHasError] = useState(false)

    const onSubmit =  (e) => {
      e.preventDefault();
      
      let data = { email, password }

      axios.post('/api/auth', data)

      .then(res => {
        Auth.login(res.data);
        history.push("/");
      }).catch(err => {
          setHasError(err.response.data.message)
      });
    }

  return (
    <AuthContainer>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {
            hasError && 
            <Box marginTop={2}>
                <Alert severity='error'>
                    <Typography component="p">
                        {hasError}
                    </Typography>
                </Alert>
            </Box>
          }
          <form className={classes.form} noValidate onSubmit={onSubmit}>
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
              onChange={e => {setEmail(e.target.value) 
                            setHasError(false)}}
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
              onChange={e => {setPassword(e.target.value)
                setHasError(false)} }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account!! Sign Up"}
                </Link>
              </Grid>
            </Grid>
            
          </form>
        </AuthContainer>
  );
}

