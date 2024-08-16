import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Location } from '../../interfaces';
import { AppDispatch } from '../../store/index';
import { useDispatch } from 'react-redux';
import { setSelectedLocationState } from '../../store/selectedLocationSlice';

interface LocationCardProps {
  location: Location;
  batteryType: string | undefined;
}

export const LocationCard = ({ location, batteryType }: LocationCardProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedLocationState({ location: location, selected: true }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem disablePadding>
          <ListItemText primary={location.nazev_provozovny} secondary={`${location.ulice}, ${location.obec} ${location.psc}`} />
          <Link to={`/collection_points_map/${batteryType}/locations/${location.id}`}>
            <IconButton onClick={handleClick}>
              <NavigateNextIcon />
            </IconButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};
