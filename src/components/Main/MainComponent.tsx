import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
//import logo from './assets/ecobat_logo.png';
import { MapBox } from '../Map/MapBox';
import { Contact } from './Contact';
import { LandingPage } from './LandingPage';
import { LocationsList } from '../Locations/LocationsList';
import { Commodities } from '../Commodities/Commodities';
import { SelectedLocation } from '../Locations/SelectedLocation';
import { StyledMainContainer, StyledAppBar, StyledDrawerHeader } from '../../styles/styledComponents';

const drawerWidth = 450;

export const MainComponent = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <StyledAppBar position="fixed" open={open}>
          <Toolbar sx={{ backgroundColor: 'primary' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
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
          variant="persistent"
          anchor="left"
          open={open}
        >
          <StyledDrawerHeader sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="Menu">
              <Link to="/">
                <HomeIcon />
              </Link>
              <Link to="/locations">Seznam míst</Link>
              <Link to="/commodities">Co se sbírá</Link>
              <Link to="/contact">Kontakt</Link>
            </div>
            <IconButton onClick={handleDrawerClose}>{<ChevronLeftIcon />}</IconButton>
          </StyledDrawerHeader>
          <Divider />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/locations" element={<LocationsList />} />
            <Route path="/commodities" element={<Commodities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/locations/:id" element={<SelectedLocation />} />
          </Routes>
        </Drawer>
        <StyledMainContainer open={open}>
          <MapBox />
        </StyledMainContainer>
      </Box>
    </Router>
  );
};
