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
  imgEdite: {
      width: "50%",
      borderRadius: "20px",
      marginBottom: "10px"
  },
  likesContainer: {
      margin: "5px 0 10px 10px",
  },
  edite: {
    padding: "10px",
    margin: "10px",
    border: "1px solid",
    borderColor: theme.palette.secondary.main,
    borderRadius: "4px"
  },
  favorite: {
      margin: "17px 5px 5px 5px",
  },
  likes: {
      marginTop: "12px"
  },
  disc: {
      margin: "16px 0 0 20px"
  }
}));

export default function ViewPost(props){
  const classes = useStyles();
  const history = useHistory();

  const [post, setPost] = useState();


  useEffect(() => {
      const { id } = props.location;
      console.log(id)

      axios.get('/api/posts/'+id)

      .then(res => {
          setPost(res.data);
          console.log(post)
      })

      .catch(err => {
          
      });
  });

  function deletePost(){
    axios.delete("/api/posts/"+post.id, {
      headers: {
        'Authorization': Auth.getToken() 
      }
    })

    .then(res => {
      history.push("/");   
    })
  } 

  let auth = Auth.auth();
  
  if(!post){
    return (
      <MainContainer>
        <h1>is loading</h1>
      </MainContainer>
    )
  }
  return (
    <MainContainer>
        {
          post.img && 
          <img src={`uploads/${post.img}`} alt="pic" className={classes.img}/>
        }
        <Grid container direction="row" className={classes.likesContainer}>
            {
                auth &&
                <Button >
                    <FavoriteOutlinedIcon fontSize="large" />
                </Button>
            }
            <Typography variant="h6" className={classes.likes} >
                {post.likes} 
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
          auth && 
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

