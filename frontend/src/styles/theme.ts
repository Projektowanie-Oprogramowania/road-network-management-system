import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    background: {
        default: '#36393f',
        paper: '#2f3136'
    },
    primary: {
      main:  green[700],
    },
    secondary: {
      main: green[500],
    },
    text: {
        primary: '#ffffff',
        secondary: '#ffffff',
        disabled: '#aaaaaa'
    }
  }
});