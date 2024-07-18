import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Location } from '../../interfaces';

export const LocationCard = ({ location }: { location: Location }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem disablePadding>
          <ListItemText primary={location.nazev_provozovny} secondary={`${location.ulice}, ${location.obec} ${location.psc}`} />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};
