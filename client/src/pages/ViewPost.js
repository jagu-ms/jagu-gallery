import { Grid, Button, Box, Typography, makeStyles } from "@material-ui/core";
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import MainContainer from "../components/MainContainer";
import { useState, useEffect } from 'react';
import { Link , useHistory} from "react-router-dom";
import axios from "axios";
import Auth from "../Auth";


const useStyles = makeStyles((theme) => ({
  img: {
      width: "100%",
      borderRadius: "20px",
      marginBottom: "10px"
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
  },
  liked: {
    color: "red"
  }
}));

export default function ViewPost(props){
  const classes = useStyles();
  const history = useHistory();

  const [post, setPost] = useState();
  const [likeState, setLikeState] = useState(true);
  const [reload, setReload] = useState(true);

  let userId = localStorage.getItem('id');

  useEffect(() => {
      const { id } = props.location;

      axios.get('/api/posts/'+id)

      .then(res => {
          setPost(res.data); 
          checkLike(res.data?.likes);
      })

      .catch(err => {
          console.log(err)
      });
  }); // eslint-disable-line react-hooks/exhaustive-deps
  
  function checkLike(likes) {
    if(likes.some(likes => likes._id === userId)){
          setLikeState(false);
      } else{
          setLikeState(true);
      }
  }

  function deletePost(){
    axios.delete("/api/posts/"+post.id, {
      headers: {
        'Authorization': Auth.getToken() 
      }
    })
    .then(res => {
      history.push("/");   
    })
    .catch(err => {
      console.log(err);      
    })
  }
  
  function onClikeLike(){
      if(likeState) {
        axios.post('api/likes/'+post.id, likeState, {
          headers: {
            'Authorization': Auth.getToken() 
          }
        })
        .then(res => {
          setReload(!reload)
        })

        .catch(err => {
          console.log(err)
        })
        setReload(!reload)
      } else {
        axios.post('api/likes/delete/'+post.id, likeState, {
          headers: {
            'Authorization': Auth.getToken() 
          }
        })
        .then(res => {
          setReload(!reload)
        })
        .catch(err => {
          console.log(err)
        })
        setReload(!reload)
      }
  }
  
  if(!post){
    return (
      <MainContainer>
        <h1>loading..</h1>
      </MainContainer>
    )
  }

  let auth = Auth.auth();

  return (
    <MainContainer>
        {
          post.img && 
          <img src={`uploads/${post.img}`} alt="pic" className={classes.img}/>
        }
        <Grid container direction="row" className={classes.likesContainer}>
            {
                auth &&
                <Button onClick={onClikeLike}>
                    {
                    likeState? <FavoriteOutlinedIcon fontSize="large" />
                    : <FavoriteOutlinedIcon className={classes.liked} fontSize="large" />
                    }
                </Button>
            }
            <Typography variant="h6" className={classes.likes} >
                {post?.likes.length} 
            </Typography>
            <FavoriteOutlinedIcon fontSize="small" className={classes.favorite}/>
        </Grid>
        <Box p={2} textAlign="center">
          <Typography variant="h4" >
                {post.title}
          </Typography>
          <Typography variant="p"  className={classes.disc}>
              {post.discr} 
          </Typography>
        </Box>
        {
          post?.author?.id === localStorage.getItem("id") && 
          <Grid container direction="row" alignItems="center">
            <Box p={2}>
              <Link to={{
                  pathname: '/editepost',
                  data: {
                    id: post.id, 
                    imgToEdite: post.img, 
                    titleToEdite: post.title, 
                    discrToEdite: post.discr
                    }
              }}>
              <Button margin={4} variant="outlined">
                <EditOutlinedIcon fontSize="large" color="primary"/> 
              </Button>
              </Link>
            </Box>
            <Box p={2}>
              <Button margin={4} variant="outlined" onClick={deletePost }>
                <DeleteOutlineOutlinedIcon fontSize="large" color="primary"/> 
              </Button>
            </Box>
          </Grid>
        }
    </MainContainer>
  )
}

