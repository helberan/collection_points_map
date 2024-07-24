import mapboxgl from 'mapbox-gl';
import supercluster from 'supercluster';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/index';
import { setInitialState } from '../../store/locationsSlice';
import Loader from '../Loader';

export const MapBox = () => {
  const dispatch: AppDispatch = useDispatch();

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
        const response = await fetch('../../public/locations.json').then((res) => res.json());
        //console.log('locations loaded in map component ', response.locations);
        dispatch(setInitialState(response.locations));
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocations();
  }, [dispatch]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsYmVyYW4iLCJhIjoiY2x5eWNkdmRpMjBvYTJsc2d2aHE3d2k3cCJ9.Z5ibEs3d8wWhEiHznS9upQ';

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
