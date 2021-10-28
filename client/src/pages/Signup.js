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

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [ConfirmPassword, setConfirmPassword] = useState()
    const [hasError, setHasError] = useState(false)

    const onSubmit =  (e) => {
        e.preventDefault();

        if( !name || !email || !password ){
          setHasError("All form fields are required");
          return
        }

        if(password !== ConfirmPassword) {
            setHasError("please confirm password")
            return
        }
        
        let data = {name, email, password}

        axios.post('/api/auth/signup', data)

        .then(res => {
          Auth.login(res.data);
          history.push("/mine");
        }).catch(err => {
          console.log(err)
            setHasError(err.response.data.message)
        });
    }

  return (
    <AuthContainer>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      {
            hasError && 
            <Box marginTop={2}>
                <Alert severity='error'>
                    <Typography component="p" >
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
          label="Name"
          name="name"
          autoFocus
          onChange={e => {setName(e.target.value)
                        setHasError(false)}}
        />
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Confirm Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={e => {setConfirmPassword(e.target.value)
                        setHasError(false)}}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link href="login" variant="body2">
              {"Login"}
            </Link>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Link href="/" variant="body2">
              {"home"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthContainer>
  );
}