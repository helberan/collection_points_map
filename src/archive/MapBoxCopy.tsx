import mapboxgl from 'mapbox-gl';
import supercluster from 'supercluster';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/index';
import { setInitialState } from '../../store/locationsSlice';
import Loader from '../Loader';

export const MapBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const mapboxToken: string | undefined = process.env.REACT_APP_MAPBOX_TOKEN;

  const locations = useSelector((state: RootState) => state.locations.locations);
  const [loading, setLoading] = useState<boolean>(true);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (locations.length > 0) {
      setLoading(false);
    }
  }, [locations]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/locations.json').then((res) => res.json());
        //console.log('locations loaded in map component ', response.locations);
        dispatch(setInitialState(response.locations));
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocations();
  }, [dispatch]);

  useEffect(() => {
    if (mapboxToken) {
      mapboxgl.accessToken = mapboxToken;
    }

    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [14.4378, 50.0755],
      zoom: 8,
    });

    locations.forEach((point) => {
      new mapboxgl.Marker().setLngLat([point.lng, point.lat]).addTo(map);
    });

    return () => map.remove();
  }, [locations]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};
