import { Grid, Button, makeStyles, TextField, Typography, Box} from "@material-ui/core";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Alert from '@material-ui/lab/Alert';
import MainContainer from "../components/MainContainer";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Auth from "../Auth";


const useStyles = makeStyles((theme) => ({
  img: {
      width: "70%",
      borderRadius: "20px",
      marginBottom: "10px"
  },
  form: {
    padding: "10px",
    margin: "10px",
    border: "1px solid",
    borderColor: theme.palette.secondary.main,
    borderRadius: "4px"
  },
  upload: {
    cursor: "pointer"
  }
}));

export default function CreatePost(){
  const classes = useStyles();
  const history = useHistory();

  const [title, setTitle] = useState();
  const [discr, setDiscr] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [hasError, setHasError] = useState();

  const handleChange = e => {
    if (e.target.files.length) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0])
    }
  };
  
  const onSubmit = () => {
    if( !image || !title || !discr ){
      setHasError("please upload the pic and the other data");
      return
    }

    const data = new FormData();
    data.append('title', title);
    data.append('discr', discr);
    data.append('image', image, image.name);
    
    axios.post("/api/posts", data, {
      headers: {
        'Authorization': Auth.getToken() 
      }
    })

    .then(res => { 
      history.push("/mine");  
    }).catch(err => {
        setHasError(err.response.data.message)
    });
  }


  return (
    <MainContainer>
        {
          image && <img src={imageUrl} alt="pic" className={classes.img}/>
        }
        <Grid container  md={8} alignItems="center" direction="column" className={classes.form}>
          <label htmlFor="upload-button" className={classes.upload}>
                <AddAPhotoIcon/>
          </label>
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
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <br />
          <TextField 
            margin="normal"
            label="title" 
            variant="outlined"
            required
            fullWidth
            onChange={e => {setTitle(e.target.value) 
                            setHasError(false)}}
          />
          <TextField
            margin="normal"
            label="description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            onChange={e => {setDiscr(e.target.value) 
                            setHasError(false)}}
          />
          <Button variant="contained" color="secondary" onClick={onSubmit} >
            save
          </Button>
        </Grid>
    </MainContainer>
  )
}
