import { Grid, Button, Box, Typography, makeStyles, TextField} from "@material-ui/core";
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MainContainer from "../components/MainContainer";
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
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
    // with <AppRoute path="/viewpost/:id" exact component={ViewPost}/> doesn't work
    // and with <AppRoute path="/viewpost" exact component={ViewPost}/> works normaly
    // even when i copied the home page codes exactly!!
    // what is crazy !!!
      axios.get('/api/posts/')

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
        <Image itemData={post}/>
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

function Image({itemData}) {
  const classes = useStyles();

  return (
      <>
          {
              itemData.map((item) => (
                  <Grid item lg={8} sm={10} xm={12} key={item.id} >
                      <div>
                          <Button>
                              <Link to={"/viewpost/"+item._id}>
                                  <img src={`uploads/${item.img}`} alt={item.title} className={classes.img}/>
                              </Link>
                          </Button>
                      </div>
                  </Grid>
              ))
          }
      </>
  );
}