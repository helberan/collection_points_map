import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
//import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import { Contact } from './Contact';
import { LandingPage } from './LandingPage';
import { LocationsList } from './LocationsList';
import { Commodities } from './Commodities/Commodities';

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

export const LeftDrawer = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
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
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary">
            <Tab sx={{ minWidth: '35px', width: '35px' }} label={<HomeIcon />} {...a11yProps(0)} />
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
  );
};
