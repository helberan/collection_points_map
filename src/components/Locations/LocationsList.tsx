import Loader from '../Loader';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LocationCard } from './LocationCard';
import { useState, useEffect, ChangeEvent } from 'react';
import { Location } from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { Link, useParams } from 'react-router-dom';
import commodities from '../Commodities/commodities.json';

export const LocationsList = () => {
  const { batteryType } = useParams<{ batteryType: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchedText, setSearchedText] = useState<string>('');
  const [filteredLocations, setFilteredLocations] = useState<Location[] | null>(null);

  //store
  const locations = useSelector((state: RootState) => state.locations.locations);
  const selectedType = useSelector((state: RootState) => state.selectedType);

  const selectedTypeCommodity = commodities.filter((commodity) => commodity.id === selectedType);

  //search a specific location - input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };

  //search a specific location
  const handleSearch = () => {
    setLoading(true);

    const filtered = locations.filter(
      (location) => location.mesto.toLowerCase().includes(searchedText.toLowerCase()) && location.commodity.includes(selectedTypeCommodity[0].id)
    );

    setFilteredLocations(filtered);
    setLoading(false);
  };

  //filter reset
  const handleFilterReset = () => {
    setSearchedText('');
    setLoading(true);

    const filtered = locations.filter((location) => location.commodity.includes(selectedTypeCommodity[0].id));

    setFilteredLocations(filtered);
    setLoading(false);
  };

  //locations loading
  useEffect(() => {
    setLoading(true);

    const filtered = locations.filter((location) => location.commodity.includes(selectedTypeCommodity[0].id));

    setFilteredLocations(filtered);
    setLoading(false);
  }, [locations, selectedType]);

  const locationsDisplay = () => {
    if (filteredLocations && filteredLocations.length > 0) {
      return (
        <div>
          {filteredLocations?.map((location: Location) => (
            <LocationCard key={location.kod_provozovny} location={location} batteryType={batteryType} />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <p>Nic jsme nenašli :(</p>
        </div>
      );
    }
  };

  return (
    <div className="Main">
      <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <Link to="/collection_points_map">
          <IconButton sx={{ marginRight: '1rem' }}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Typography variant="h2" gutterBottom sx={{ fontSize: '1.3rem', height: '40px', display: 'flex', alignItems: 'center' }}>
          {selectedTypeCommodity[0].categoryName}
        </Typography>
      </Box>
      <Box sx={{ marginBottom: '0.5rem' }}>
        <TextField id="outlined-search" label="Vyhledat místo" type="search" size="small" onChange={handleChange} />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={handleFilterReset}>
          <FilterAltOffIcon />
        </IconButton>
      </Box>
      {loading ? <Loader /> : locationsDisplay()}
    </div>
  );
};
