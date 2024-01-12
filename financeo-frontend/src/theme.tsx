import {createTheme} from '@mui/material/styles';

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();


const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
        text: {
            primary: textColor,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0, // Spezifisch für Buttons
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 0, // Spezifisch für TextFields
                },
            },
        },
        // Sie können dies für jede andere Komponente wiederholen, die Sie anpassen möchten
    },
});

export default theme;
