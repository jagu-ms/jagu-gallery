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

    const [/* name, */ setName] = useState()
    const [/* email */, setEmail] = useState()
    const [/* password */, setPassword] = useState()
    /* const [loading, setLoading] = useState(false) */
    const [hasError/* , setHasError */] = useState(false)

    const onSubmit = async (event) => {
        event.preventDefault();
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
                        <Typography component="h1" variant="h5">
                            Sign up err
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={setName}
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
              onChange={setEmail}
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
              onChange={setPassword}
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
            
          </form>
        </AuthContainer>
  );
}