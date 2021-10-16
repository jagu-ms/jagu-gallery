import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Image from "../assets/sidshikh.jpg"



const useStyles = makeStyles((theme) => ({
    root: {
        height: '700px',
    },
    image: {
        backgroundImage: `url(${Image})` ,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    
}));

export default function AuthContainer({children}) {
    const classes = useStyles();

  return (
    <Grid container  className={classes.root}>
      <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {children}
        </div>
        <Box mt={5}>
              <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            Jagu Gallery
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}