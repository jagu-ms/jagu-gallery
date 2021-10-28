import { Grid, Button, Box, Typography, makeStyles, TextField } from "@material-ui/core";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MainContainer from "../components/MainContainer";
import Alert from '@material-ui/lab/Alert';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Auth from "../Auth";


const useStyles = makeStyles((theme) => ({
  imgEdite: {
      width: "50%",
      borderRadius: "20px",
      marginBottom: "10px"
  },
  edite: {
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

export default function EditePost(props) {
  const classes = useStyles();
  const history = useHistory();

  const [title, setTitle] = useState();
  const [discr, setDiscr] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [hasError, setHasError] = useState();

  useEffect(() => {
    dataHandling();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps 

  const dataHandling = () => {
    const {titleToEdite, discrToEdite, imgToEdite}  = props.location.data;
    setTitle(titleToEdite);
    setDiscr(discrToEdite);
    setImage(imgToEdite);
  }

  const handleChange = e => {
    if (e.target.files.length) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0])
    }
  };
  
  const onSubmit = () => {
    const id  = props.location.data.id;
    if( !image || !title || !discr ){
      setHasError("please upload the pic and the other data");
      return
    }
    const data = new FormData();
    data.append('title', title);
    data.append('discr', discr);
    data.append('image', image, image.name);
    
    axios.put("/api/posts/"+id , data, {
      headers: {
        'Authorization': Auth.getToken() 
      }
    })

    .then(res => {
        history.push("/");
    })
    .catch(err => {
        setHasError(err.response.data.message)
    });
  }

  return (
    <MainContainer>
      <Grid container  md={8} alignItems="center" direction="column" className={classes.edite}>
        <Box p={4}>
          <p>please reload the image so you can edite post</p>
        </Box>
        {
          imageUrl ? <img src={imageUrl} alt="pic" className={classes.imgEdite}/>
                    : <img src={`uploads/${image}`} alt="pic" className={classes.imgEdite}/>
        }
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
          value={title}
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
          value={discr}
          onChange={e => {setDiscr(e.target.value) 
                            setHasError(false)}}
        />
        <Button onClick={onSubmit} variant="contained" color="secondary" >
          save
        </Button>
      </Grid>
    </MainContainer>
  )
}