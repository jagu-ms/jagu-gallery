import { useState } from 'react';
import { 
        makeStyles, 
        AppBar, 
        Toolbar, 
        Typography,
        Button, 
        IconButton, 
        Avatar, 
        Menu, 
        MenuItem ,
        Link,
        Box
        } from '@material-ui/core'
import Auth from "../../Auth"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
            color: "white"
    },
    titleAuth: {
        marginRight: theme.spacing(4),
        color: "white"
    },
    photoIcon: {
        marginRight: "auto"
    }
}))


export default function Header() {
    /* const user = localStorage.getItem("user"); */
    let moh = {
        name : "mohamed",
        age: "24"
    }
    const user = moh;
    
    return (
        <AppBar  position="static" color="secondary">
                <Toolbar>
                    {
                        user ? <UserMenu user={user} /> : <GuestMenu/>
                    }
                </Toolbar>
        </AppBar>
    )
}

function GuestMenu() {
    const classes = useStyles();

    return (
        <>
            <Link href='/' passHref className={classes.title}>
                <Typography variant="h6" >
                    Home
                </Typography>
            </Link>
            <Link href='/login' passHref>
                <Button variant="outlined">
                    Login
                </Button>
            </Link>
        </>
    )
}

function UserMenu({user}) {
    const classes = useStyles();
    const [menu, setMenu] = useState(null)
    const handleMenu = (event) => setMenu(event.currentTarget)
    const handleClose = () => setMenu(null)

    const handleLogout = async () => {
        setMenu(null)
        await Auth.logout();
    }

    return (
        <>
            <Link href='/'  className={classes.titleAuth}>
                <Typography variant="h6" >
                    Home
                </Typography>
            </Link>
            <Link href='/createpost'  className={classes.photoIcon} >
                <IconButton>
                    <AddAPhotoIcon />
                </IconButton>
            </Link>
            {user?.name}
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Avatar >
                    <Box className={classes.title}>{user.name?.charAt(0)}</Box>
                </Avatar>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={menu}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                open={Boolean(menu)}
                onClose={handleClose}
            >
                <Link href='/profile' passHref color="inherit">
                    <MenuItem>
                        profile
                    </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                    logout
                </MenuItem>
            </Menu>
        </>
    )
}