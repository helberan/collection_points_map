import './App.css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
//import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { MapWrapper } from './components/MapWrapper';
import { Contact } from './components/Contact';
import { LandingPage } from './components/LandingPage';
import { LocationsList } from './components/LocationsList';
import { Commodities } from './components/Commodities/Commodities';
import logo from './assets/ecobat_logo.png';

const drawerWidth = 450;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div className="App">
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
            <Toolbar>
              <Typography variant="h5" noWrap component="div">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
                <input type="text" placeholder="Vyhledat místo" />
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
              <Box sx={{ width: '100%', overflow: 'auto' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab sx={{ minWidth: '30px', width: '30px' }} label={<HomeIcon />} {...a11yProps(0)} />
                  <Tab label="Seznam míst" {...a11yProps(1)} />
                  <Tab label="Co se sbírá" {...a11yProps(2)} />
                  <Tab label="Kontakt" {...a11yProps(3)} />
                </Tabs>
              </Box>
            </Toolbar>
            <Divider />
            <Box>
              <CustomTabPanel value={value} index={0}>
                <LandingPage />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <LocationsList />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Commodities />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <Contact />
              </CustomTabPanel>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, padding: '0' }}>
            <Toolbar />
            <MapWrapper />
          </Box>
        </Box>
      </div>
    </Router>
  );
}

export default App;
