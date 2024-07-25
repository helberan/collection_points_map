import Loader from '../Loader';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { LocationCard } from './LocationCard';
import { useState, useEffect, ChangeEvent } from 'react';
import { Location } from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

export const LocationsList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchedText, setSearchedText] = useState<string>('');
  const locations = useSelector((state: RootState) => state.locations.locations);
  const [filteredLocations, setFilteredLocations] = useState<Location[] | null>(null);

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
    if (locations.length > 0) {
      setLoading(false);
      setFilteredLocations(locations);
    }
  }, [locations]);

  return (
    <div className="Main">
      <Box sx={{ marginBottom: '0.5rem' }}>
        <TextField id="outlined-search" label="Vyhledat místo" type="search" size="small" onChange={handleChange} />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
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
