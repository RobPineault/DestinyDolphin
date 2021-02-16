import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#032A5D',//blue
        },
        secondary: {
            main: '#D96B15', //orange
        },
        warning: {
            main: '#CCDAEB', //light blue
        },
        error: {
            main: '#FEFBEC', //white
        },
        info: {
            main: '#DAD9D5', // grey
        },
        success: {
            main: '#B38650', //gold
        }, 
        background: {
            default: '#4E5F76'
        }
    },
    overrides: {
        MuiPaper: {
            root: {
                backgroundColor: '#DAD9D5',
            }            
        },/*
        MuiToolbar: {
            regular: {
                minHeight: '80px !important'
            },
        },*/
        MuiButton: {
            root: {
                textTransform: 'none',
            }
        }
    },

});

export default theme;

/*
 blue: 16212C
 light blue: 4E5F76
 orange: D96B15
 light grey: ADADAD
 dark grey: 2F2E2E

main: '#032A5D',
        },
        secondary: {
            main: '#F97444',

darkBlue: {
            main: '#161D28',
        },
        offWhite: {
            main: '#E5E5E5',
        },
        black: {
            main: '#0F141A',
        },
        background: {
            default: '#4E5F76',
        },
*/