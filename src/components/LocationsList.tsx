import Loader from './Loader';
import { useState, useEffect } from 'react';

export const LocationsList = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('../../public/locations.json').then((res) => res.json());
        console.log(response);
        setLocations(response);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="Main">
      <h2>Seznam míst</h2>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* ADD LOCATION INTERFACE + ADJUST JSON KEY NAMES */}
          {locations?.map((location: any) => (
            <h3>
              {location.lat}, {location.lng}
            </h3>
          ))}
        </div>
      )}
    </div>
  );
};
