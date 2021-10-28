import React from "react";
import MainContainer from "../components/MainContainer"
import { makeStyles, Grid, Typography, Button} from "@material-ui/core";
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import Auth from "../Auth";

const useStyles = makeStyles((theme) => ({
    img: {
        width: "100%",
        height: "100%",
        borderRadius: "20px"
    },
    likesContainer: {
        margin: "5px 0 10px 10px",
    },
    favorite: {
        margin: "17px 5px 5px 5px",
        fontSize: 15
    },
    likes: {
        marginTop: "12px"
    },
    disc: {
        margin: "16px 0 0 20px"
    }
}));

export default function Mine() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts/mine', {
          headers: {
            'Authorization': Auth.getToken() 
          }
        })

        .then(res => {
            setPosts(res.data);
        })

        .catch(err => {
            
        });
    }, []);

    if(posts.length < 1){
      return (
      <MainContainer>
          <h1>No posts yet!</h1>
      </MainContainer>
      )
    }
    if(!posts){
        return (
        <MainContainer>
            <h1>loading...</h1>
        </MainContainer>
        )
    }

    return (
        <MainContainer>
            <BasicImageList itemData={posts}/>
        </MainContainer>
    )
}

function BasicImageList({itemData}) {
    const classes = useStyles();

    return (
        <>
            {
                itemData.map((item) => (
                    <Grid item lg={8} sm={10} xm={12} key={item.id} >
                        <div>
                            <Button>
                                <Link to={{
                                    pathname: '/viewpost',
                                    id: item.id
                                }}>
                                    <img src={`uploads/${item.img}`} alt={item.title} className={classes.img}/>
                                </Link>
                            </Button>
                        </div>
                        
                        <Grid container direction="row" className={classes.likesContainer}>
                            <Typography variant="h6" className={classes.likes} >
                                {item.likes.length} 
                            </Typography>
                            <FavoriteOutlinedIcon fontSize="small" className={classes.favorite}/>
                        </Grid>
                        <Grid container direction="row" className={classes.likesContainer}>
                            <Typography variant="h4" >
                                {item.title}
                            </Typography>
                            <Typography variant="p"  className={classes.disc}  >
                                {item.title.substr(0,50) + "..."} 
                            </Typography>
                        </Grid>
                    </Grid>
                ))
            }
        </>
    );
}