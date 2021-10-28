import { makeStyles, Container, Paper, CssBaseline } from '@material-ui/core'
import Header from "./mainC.Components/Header"

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh"
    },
}))

export default function Main({children, loading}) {
    const classes = useStyles();

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