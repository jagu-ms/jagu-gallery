import { 
  makeStyles, 
  Container, 
  Paper, 
  Backdrop, 
  CircularProgress 
 } from '@material-ui/core'
import Header from "./mainC.Components/Header"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    container: {
        flexGrow: 1,
        display: 'flex',
        padding: 0,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.primary.main,
        background: "#ffffff"
    },
    content: {
        paddingTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
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
        <div className={classes.root}>
            <Header/>
            <Container maxWidth="false"  className={classes.container}>
                <Paper  variant="outlined" className={classes.content}>
                    
                    {children}
                </Paper>
            </Container>
        </div>
    )
}