import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../../assets/ecobat_logo.png';
import { MapBox } from '../Map/MapBox';
import { Contact } from './Contact';
import { LocationsList } from '../Locations/LocationsList';
import { Commodities } from '../Commodities/Commodities';
import { SelectedLocation } from '../Locations/SelectedLocation';
import { StyledMainContainer, StyledAppBar, StyledDrawerHeader } from '../../styles/styledComponents';

const drawerWidth = 450;

export const MainComponent = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <StyledAppBar position="fixed">
          <Toolbar sx={{ backgroundColor: 'primary', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Box component="img" src={logo} alt="Company Logo" sx={{ height: 50 }} />
          </Toolbar>
        </StyledAppBar>
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
          <StyledDrawerHeader sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="Menu">
              <Link to="/collection_points_map">
                <HomeIcon />
              </Link>
              <Link to="/collection_points_map/contact">O nás</Link>
            </div>
          </StyledDrawerHeader>
          <Divider />
          <Routes>
            <Route path="/collection_points_map/:batteryType/locations" element={<LocationsList />} />
            <Route path="/collection_points_map" element={<Commodities />} />
            <Route path="/collection_points_map/contact" element={<Contact />} />
            <Route path="/collection_points_map/:batteryType/locations/:id" element={<SelectedLocation />} />
          </Routes>
        </Drawer>
        <StyledMainContainer open>
          <MapBox />
        </StyledMainContainer>
      </Box>
    </Router>
  );
};
