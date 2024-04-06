import {createTheme} from '@mui/material'

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
    interface Palette {
        neutral: PaletteColorOptions;
    }

    interface PaletteOptions {
        neutral?: PaletteColorOptions;
    }

    interface PaletteColorOptions {
        main?: string
        light?: string,
        dark?: string
        contrastText?: string
        notContrastText?: string
    }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#BB88FF',
            light: '#c89fff',
            dark: '#825fb2',
            contrastText: '#fff',
        },
        secondary: {
            main: '#19C595',
            light: '#47d0aa',
            dark: '#118968',
            contrastText: '#fff',
        },
        neutral: {
            main: '#757575',
            light: '#9e9e9e',
            dark: '#616161',
            contrastText: '#FFFFFF',
            notContrastText: '#616161',
        },
    },
    components: {
        MuiStack: {
            styleOverrides: {
                root: {
                    marginTop: 0
                }
            }
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    '-webkit-box-shadow': '0px 0px 28px -19px rgba(0, 0, 0, 0.98)',
                    '-moz-box-shadow': '0px 0px 28px -19px rgba(0, 0, 0, 0.98)',
                    boxShadow: '0px 0px 28px -19px rgba(0, 0, 0, 0.98)',
                },
            },
        },
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        "color": "#19C595"
                    }
                }
            }
        },
    },
})

export const globalStyles = () => ({
    '.css-1rb8ayf-MuiStack-root .css-1rb8ayf-MuiStack-root > :not(style) ~ :not(style)': {
        marginTop: 0
    },
    '.MuiDrawer-paper': {
        borderRadius: "20px 20px 0 0"
    },
    '&::-webkit-scrollbar': {
        width: 5,
        height: 5,
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: null,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#b2b2b2',
        borderRadius: 2,
    },
})