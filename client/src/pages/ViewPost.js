import { Grid, Button, Box, Typography, makeStyles, TextField} from "@material-ui/core";
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MainContainer from "../components/MainContainer";
import { useState, useEffect } from 'react';
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

  const [post, setPost] = useState();
  const [edite, setEdite] = useState(false);


  useEffect(() => {
      let postId = props.match.params.id;

      axios.get('/api/posts/'+postId)

      .then(res => {
          setPost(res.data);
          console.log(post)
      })

      .catch(err => {
          
      });
  });

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
          <Box p={2}>
            <Button onClick={() => setEdite(!edite)} margin={4}>
              <EditOutlinedIcon fontSize="large" color="primary"/> 
            </Button>
          </Box>
        }
        {
          edite && <EditePost/>
        }
    </MainContainer>
  )
}

const EditePost = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container  md={8} alignItems="center" direction="column" className={classes.edite}>
        <AddAPhotoIcon/>
        <TextField 
          margin="normal"
          label="title" 
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          margin="normal"
          label="description"
          multiline
          rows={4}  
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="secondary" >
          save
        </Button>
      </Grid>
    </>
  )
}   

