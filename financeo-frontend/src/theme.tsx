import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import * as COLORS from './constants/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: COLORS.SCHEME2.mainBackground,
        },
        secondary: {
            main: green[500],
        },
        warning: {
            main: COLORS.SCHEME2.warn,
        }
    },
});

export default theme;