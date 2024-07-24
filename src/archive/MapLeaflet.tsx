import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { LatLngExpression } from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/index';
import { setInitialState } from '../../store/locationsSlice';
import { useEffect, useState } from 'react';
import Loader from '../Loader';

export const MapLeaflet = () => {
  const dispatch: AppDispatch = useDispatch();

  const locations = useSelector((state: RootState) => state.locations.locations);
  const [loading, setLoading] = useState<boolean>(true);

  const openStreetMapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const center: LatLngExpression = [49.8882525, 15.531435];

  useEffect(() => {
    if (locations.length > 0) {
      setLoading(false);
    }
  }, [locations]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('../../public/locations.json').then((res) => res.json());
        //console.log('locations loaded in map component ', response.locations);
        dispatch(setInitialState(response.locations));
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocations();
  }, [dispatch]);

  return (
    <div className="Map">
      <MapContainer center={center} zoom={8} style={{ height: '100%', width: '100%' }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={openStreetMapUrl} />
        {loading ? (
          <Loader />
        ) : (
          <MarkerClusterGroup>
            {locations.map((location) => (
              <Marker position={[location.lat, location.lng]} key={location.kod_provozovny}></Marker>
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </div>
  );
};
