import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Location } from '../../interfaces';
import { AppDispatch } from '../../store/index';
import { useDispatch } from 'react-redux';
import { setSelectedLocationState } from '../../store/selectedLocationSlice';

export const LocationCard = ({ location }: { location: Location }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedLocationState({ location: location, selected: true }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} onClick={handleClick}>
      <List>
        <ListItem disablePadding>
          <ListItemText primary={location.nazev_provozovny} secondary={`${location.ulice}, ${location.obec} ${location.psc}`} />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};
