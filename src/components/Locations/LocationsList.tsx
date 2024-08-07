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
import { Link } from 'react-router-dom';
import commodities from '../Commodities/commodities.json';

export const LocationsList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchedText, setSearchedText] = useState<string>('');
  const [filteredLocations, setFilteredLocations] = useState<Location[] | null>(null);

  //store
  const locations = useSelector((state: RootState) => state.locations.locations);
  const selectedType = useSelector((state: RootState) => state.selectedType);

  const selectedTypeCommodity = commodities.filter((commodity) => commodity.id === selectedType);

  //search a specific location
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };

  const handleSearch = () => {
    console.log('searching....', searchedText);
    setLoading(true);

    const filtered = locations.filter((searchedLocation) => searchedLocation.mesto.toLowerCase().includes(searchedText.toLowerCase()));

    setFilteredLocations(filtered);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const filtered = locations.filter((location) => location.commodity.includes(selectedType));
    console.log(filtered);

    setFilteredLocations(filtered);
    setLoading(false);
  }, [locations, selectedType]);

  return (
    <div className="Main">
      <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <Link to="/">
          <IconButton sx={{ marginRight: '1rem' }}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Typography variant="h2" gutterBottom sx={{ fontSize: 20, height: '40px', display: 'flex', alignItems: 'center' }}>
          {selectedTypeCommodity[0].categoryName}
        </Typography>
      </Box>
      <Box sx={{ marginBottom: '0.5rem' }}>
        <TextField id="outlined-search" label="Vyhledat místo" type="search" size="small" onChange={handleChange} />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <FilterAltOffIcon />
        </IconButton>
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {filteredLocations?.map((location: Location) => (
            <LocationCard key={location.kod_provozovny} location={location} />
          ))}
        </div>
      )}
    </div>
  );
};
