import { createTheme} from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
        main: '#556cd6',
        },
        secondary: {
        main: '#19857b',
        },
        black: {
            main: '#19857b',
        },
        error: {
        main: '#19457b',
        },
        background: {
            default: '#fff',
            },
    },
});

export default theme;