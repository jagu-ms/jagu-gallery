import React from "react";
import MainContainer from "../components/MainContainer"
import { makeStyles, Grid, Typography, Button} from "@material-ui/core";
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import own from "../assets/1.jpg";
import two from "../assets/2.jpg";
import three from "../assets/3.jpg";
import four from "../assets/4.jpg";
import five from "../assets/5.jpg";
import six from "../assets/6.jpg";
import seven from "../assets/7.jpg";



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
        margin: "12px 5px 5px 5px",
    },
    likes: {
        marginTop: "7px"
    }
}));

export default function Home() {
    let itemData = [
        {
            img: own,
            title: "moh",
            id: "1",
            likes: 22
        },
        {
            img: two,
            title: "ahmad",
            id: "2",
            likes: 22
        },
        {
            img: three,
            title: "samir",
            id: "3",
            likes: 22
        },
        {
            img: four,
            title: "samir",
            id: "4",
            likes: 33
        },
        {
            img: five,
            title: "samir",
            id: "4",
            likes: 22
        },
        {
            img: six,
            title: "samir",
            id: "6",
            likes: 22
        },
        {
            img: seven,
            title: "samir",
            id: "7",
            likes: 22
        },
    ]
    return (
        <MainContainer>
            {
                <BasicImageList itemData={itemData}/>
            }
        </MainContainer>
    )
}

function BasicImageList({itemData}) {
    const classes = useStyles();
    let user = "mohamed";

    return (
        <>
            {
                itemData.map((item) => (
                    <Grid item lg={8} sm={10} xm={12} key={item.id} className={classes.grid}>
                        <div>
                            <Button>
                            <img src={item.img} alt={item.title} className={classes.img}/>

                            </Button>
                        </div>
                        
                        <Grid container direction="row" className={classes.likesContainer}>
                            {
                                user &&
                                <Button>
                                    <FavoriteOutlinedIcon fontSize="large" />
                                </Button>
                            }
                            <Typography variant="h6" className={classes.likes} >
                                {item.likes} 
                            </Typography>
                            <FavoriteOutlinedIcon fontSize="small" className={classes.favorite}/>
                        </Grid>
                    </Grid>
                ))
            }
        </>
    );
}