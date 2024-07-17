import './App.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MapWrapper } from './components/MapWrapper';
import { Contact } from './components/Contact';

const drawerWidth = 400;

function App() {
  return (
    <Router>
      <div className="App">
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
            <Toolbar>
              <Typography variant="h5" noWrap component="div">
                mapa
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar>
              <div className="menu">
                <Button>Seznam míst</Button>
                <Button>Co se sbírá</Button>
                <Link to="/contact">
                  <Button>Kontakt</Button>
                </Link>
              </div>
            </Toolbar>
            <Divider />
            <Box>
              <Routes>
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            <Toolbar />
            <MapWrapper />
          </Box>
        </Box>
      </div>
    </Router>
  );
}

export default App;
