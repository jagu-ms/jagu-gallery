import { 
    makeStyles, 
    Container, 
    Paper, 
    Backdrop, 
    CircularProgress,
    CssBaseline
    } from '@material-ui/core'
import Header from "./mainC.Components/Header"

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.primary.main,
        background: "#ffffff"
    },
}))

export default function Main({children, loading}) {
    const classes = useStyles()

    if(loading) 
        return (
            <Backdrop className={classes.Backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        );
    
    return (
        <>
            <CssBaseline />
            <Header/>
            <Container maxWidth="false" component={Paper} className={classes.container}>
                {children}
            </Container>        
        </>
    )
}

/* return (
    <div className={classes.root}>
        <CssBaseline />

        <Header/>
        <Container maxWidth="false"  className={classes.container}>
            <Paper  variant="outlined" className={classes.content}>
                
                {children}
            </Paper>
        </Container>
    </div>
) */