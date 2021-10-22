import { Grid, Button, Box, Typography, makeStyles, TextField} from "@material-ui/core";
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MainContainer from "../components/MainContainer";
import own from "../assets/1.jpg";
import { useState } from 'react';


const useStyles = makeStyles((theme) => ({
  img: {
      width: "100%",
      borderRadius: "20px",
      marginBottom: "10px"
  },
  likesContainer: {
      margin: "5px 0 10px 10px",
  },
  padding: {

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

export default function ViewPost(){
  const [edite, setEdite] = useState(false)
  let item = {
      img: own,
      title: "moh",
      content: "ienrister risetnriten irsetn rit rsstdsssss dttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt ddddddddddddddddddddd dddddddddddddddddddddddddddd dddddddddddddddddddddddddddddd dddddddddddddddddddddddddddddd ddddddddddddddddddddddddddddditenri trisenirsetn ritenr tien",
      id: "1",
      likes: 22
  };
  let user = "moh";

  const classes = useStyles();

  return (
    <MainContainer>
        <p>moh</p>
        <img src={item.img} alt={item.title} className={classes.img}/>
        <Grid container direction="row" className={classes.likesContainer}>
            {
                user &&
                <Button >
                    <FavoriteOutlinedIcon fontSize="large" />
                </Button>
            }
            <Typography variant="h6" className={classes.likes} >
                {item.likes} 
            </Typography>
            <FavoriteOutlinedIcon fontSize="small" className={classes.favorite}/>
        </Grid>
        <Box p={2} textAlign="center">
          <Typography variant="h4" >
                {item.title}
          </Typography>
          <Typography variant="p"  className={classes.disc}>
              {item.content} 
          </Typography>
        </Box>

        {
          user && 
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