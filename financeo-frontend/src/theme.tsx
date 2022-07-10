import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import * as COLORS from './constants/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: COLORS.SCHEME2.lightdark,
        },
        secondary: {
            main: green[500],
        },
    },
});

export default theme;