import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LocationCard } from './LocationCard';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, ChangeEvent } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Location } from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import commodities from '../Commodities/commodities.json';

interface LocationRowProps {
  index: number;
  style: React.CSSProperties;
}

const listHeight = 500; //720;
const listWidth = 400;
const listItemSize = 75;

const filterLocations = (locations: Location[], commodityTypeId: number) => {
  return locations.filter((location) => location.commodity.includes(commodityTypeId));
};

export const LocationsList = () => {
  const { batteryType } = useParams<{ batteryType: string }>();
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
    const filtered = locations.filter(
      (location) => location.mesto.toLowerCase().includes(searchedText.toLowerCase()) && location.commodity.includes(selectedTypeCommodity[0].id)
    );

    setFilteredLocations(filtered);
  };

  //filter reset
  const handleFilterReset = () => {
    setSearchedText('');

    const filtered = filterLocations(locations, selectedTypeCommodity[0].id);

    setFilteredLocations(filtered);
  };

  //locations loading
  useEffect(() => {
    const filtered = filterLocations(locations, selectedTypeCommodity[0].id);

    setFilteredLocations(filtered);
  }, []);

  //Row of the list
  const LocationRow = ({ index, style }: LocationRowProps) => {
    if (filteredLocations) {
      const location = filteredLocations[index];
      return (
        <div style={style} key={location.kod_provozovny}>
          <LocationCard location={location} batteryType={batteryType} />
        </div>
      );
    } else {
      return null;
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
        <TextField id="outlined-search" label="Vyhledat místo" type="search" size="small" onChange={handleChange} sx={{ width: '75%' }} />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={handleFilterReset}>
          <FilterAltOffIcon />
        </IconButton>
      </Box>
      {filteredLocations && filteredLocations.length > 0 ? null : (
        <p>
          V hledaném názvu "<em>{`${searchedText}`}</em>" jsme žádné sběrné místo nenašli.
        </p>
      )}
      <List height={listHeight} itemCount={filteredLocations?.length || 0} itemSize={listItemSize} width={listWidth}>
        {LocationRow}
      </List>
    </div>
  );
};
