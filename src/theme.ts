import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#69A374',
      main: '#448d52',
      dark: '#2F6239',
      contrastText: '#fff',
    },
    secondary: {
      light: '#57EB57',
      main: '#2DE62D',
      dark: '#1FA11F',
      contrastText: '#000',
    },
  },
});

export default theme;
