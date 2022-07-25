import {createTheme} from '@mui/material/styles';
import * as COLORS from './constants/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: COLORS.SCHEME.mainBackground,
            // light: '',
            // dark: '',
            // contrastText: ''
        },
        secondary: {
            main: COLORS.SCHEME.background,
        },
        error: {
            main: COLORS.SCHEME.error,
        },
        warning: {
            main: COLORS.SCHEME.warn,
        },
        // info: {
        // },
        // success: {
        // }
    },
});

export default theme;