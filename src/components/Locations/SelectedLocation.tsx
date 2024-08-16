import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const SelectedLocation = () => {
  const { batteryType, id } = useParams<{ batteryType: string; id: string }>();
  const selectedLocation = useSelector((state: RootState) => state.selectedLocation);

  if (selectedLocation.location.id !== Number(id)) {
    return <div>Location not found or not selected</div>;
  }

  return (
    <div className="Main">
      <Link to={`/collection_points_map/${batteryType}/locations`}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <Typography variant="h2" sx={{ fontSize: '1.3rem', height: '40px', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        {selectedLocation.location.nazev_provozovny}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PlaceIcon sx={{ marginRight: '1rem' }} />
        <p>
          {selectedLocation.location.ulice}, {selectedLocation.location.obec} {selectedLocation.location.psc}
        </p>
      </Box>
      <p>{selectedLocation.location.commodity}</p>
    </div>
  );
};
