import './App.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
//import Typography from '@mui/material/Typography';
import { Map } from './components/Map/Map';
import { LeftDrawer } from './components/LeftDrawer';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your custom theme
import logo from './assets/ecobat_logo.png';

const drawerWidth = 450;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'primary' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* <input type="text" placeholder="Vyhledat místo" /> */}
                <img src={logo} alt="logo" style={{ height: '4.05rem', width: 'auto' }} />
              </Box>
            </Toolbar>
          </AppBar>
          <LeftDrawer />
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, padding: '0' }}>
            <Toolbar />
            <Map />
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
