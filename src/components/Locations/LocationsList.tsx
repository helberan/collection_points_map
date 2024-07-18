import Loader from '../Loader';
import { LocationCard } from './LocationCard';
import { useState, useEffect } from 'react';
import { Location } from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

export const LocationsList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const locations = useSelector((state: RootState) => state.locations.locations);

  useEffect(() => {
    if (locations.length > 0) {
      setLoading(false);
    }
  }, [locations]);

  return (
    <div className="Main">
      <h2>Seznam míst</h2>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {locations?.map((location: Location) => (
            <LocationCard key={location.kod_provozovny} location={location} />
          ))}
        </div>
      )}
    </div>
  );
};
