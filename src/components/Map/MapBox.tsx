import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/index';
import { setInitialState } from '../../store/locationsSlice';
import mapboxgl from 'mapbox-gl';
import { Point, Location } from '../../interfaces';
import Loader from '../Loader';

export const MapBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const mapboxToken: string | undefined = process.env.REACT_APP_MAPBOX_TOKEN;

  const mapContainerRef = useRef<HTMLDivElement | string>('');
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const locations = useSelector((state: RootState) => state.locations.locations);
  const [points, setPoints] = useState<Point | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (locations.length > 0) {
      setLoading(false);
    }
  }, [locations]);

  //CREATE POINTS FOR CLUSTERING
  useEffect(() => {
    const points: Point = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
        },
      },
      features: locations.map((location: Location) => ({
        type: 'Feature',
        properties: location,
        geometry: {
          type: 'Point',
          coordinates: [location.lng, location.lat],
        },
      })),
    };
    setPoints(points);
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
    if (mapboxToken) {
      mapboxgl.accessToken = mapboxToken;
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [14.4378, 50.0755],
      zoom: 6,
    });

    //CLUSTER DATA DEFINITION
    mapRef.current.on('load', () => {
      if (mapRef.current !== null) {
        mapRef.current.addSource('locations', {
          type: 'geojson',
          data: points,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        //CLUSTER VISUAL
        mapRef.current.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'locations',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': ['step', ['get', 'point_count'], '#7ee091', 100, '#f1f075', 750, '#f28cb1'],
            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
          },
        });

        //CLUSTER TEXT VISUAL
        mapRef.current.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'locations',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
          },
        });

        //POINT VISUAL
        mapRef.current.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'locations',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#ff2121',
            'circle-radius': 5,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff',
          },
        });

        // inspect a cluster on click
        mapRef.current.on('click', 'clusters', (e) => {
          const features = mapRef.current.queryRenderedFeatures(e.point, {
            layers: ['clusters'],
          });
          const clusterId = features[0].properties.cluster_id;
          mapRef.current.getSource('locations').getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            mapRef.current.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        mapRef.current.on('click', 'unclustered-point', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const nazev = e.features[0].properties.nazev_provozovny;
          const kod = e.features[0].properties.kod_provozovny;

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup().setLngLat(coordinates).setHTML(`<b>${nazev}</b><br>Kód provozovny: ${kod}`).addTo(mapRef.current);
        });

        mapRef.current.on('mouseenter', 'clusters', () => {
          mapRef.current.getCanvas().style.cursor = 'pointer';
        });
        mapRef.current.on('mouseleave', 'clusters', () => {
          mapRef.current.getCanvas().style.cursor = '';
        });
      }
    });

    return () => mapRef.current.remove();
  }, [points, mapboxToken]);

  return <div id="map" ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}></div>;
};
