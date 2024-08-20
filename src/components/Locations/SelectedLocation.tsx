import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PlaceIcon from '@mui/icons-material/Place';
import Battery20Icon from '@mui/icons-material/Battery20';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { CommodityCard } from '../Commodities/CommodityCard';
import commoditiesData from '../Commodities/commodities.json';

export const SelectedLocation = () => {
  const { batteryType, id } = useParams<{ batteryType: string; id: string }>();
  const selectedLocation = useSelector((state: RootState) => state.selectedLocation);
  const [commodities, setCommodities] = useState(commoditiesData);

  useEffect(() => {
    const identifyCommodities = () => {
      let numbers: number[];
      if (selectedLocation && typeof selectedLocation.location.commodity === 'string') {
        const stringNumbers = selectedLocation.location.commodity.replace(/[[\]]/g, '').split(',');
        numbers = stringNumbers.map((stringNumber: string) => Number(stringNumber));
      } else {
        numbers = selectedLocation.location.commodity;
      }

      setCommodities(commoditiesData.filter((commodity) => numbers.includes(commodity.id)));
    };

    identifyCommodities();
  }, [selectedLocation]);

  if (selectedLocation.location.id !== Number(id)) {
    return <div>Sběrné místo nenalezeno, nebo nebylo zvoleno.</div>;
  } else {
    return (
      <div className="Main">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to={`/collection_points_map/${batteryType}/locations`}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Link>
        </Box>
        <Typography variant="h2" sx={{ fontSize: '1.3rem', height: '40px', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          {selectedLocation.location.nazev_provozovny}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <PlaceIcon sx={{ marginRight: '1rem' }} />
          <Typography>
            {selectedLocation.location.ulice}, {selectedLocation.location.obec} {selectedLocation.location.psc}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <RecyclingIcon sx={{ marginRight: '1rem' }} />
          <Typography>Baterie, které zde můžete odevzdat:</Typography>
        </Box>
        <Box>
          {commodities.map((commodity) => (
            <CommodityCard key={commodity.id} commodity={commodity} clickable={false} />
          ))}
        </Box>
      </div>
    );
  }
};
