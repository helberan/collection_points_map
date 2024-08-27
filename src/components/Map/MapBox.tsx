import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store/index';
import { setLocationsState } from '../../store/locationsSlice';
import { setSelectedLocationState } from '../../store/selectedLocationSlice';
import mapboxgl from 'mapbox-gl';
import { Location } from '../../interfaces';
import { GeoJSON } from 'geojson';
import commoditiesData from '../Commodities/commodities.json';

const mapboxToken: string | undefined = process.env.REACT_APP_MAPBOX_TOKEN;

const initialData: GeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: [],
      geometry: {
        type: 'Point',
        coordinates: [],
      },
    },
  ],
};

export const MapBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  //map containers ref
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  //state
  const locations = useSelector((state: RootState) => state.locations.locations);
  const selectedType = useSelector((state: RootState) => state.selectedType);
  const selectedLocation = useSelector((state: RootState) => state.selectedLocation);

  //locations prepared to be placed on the map
  const [points, setPoints] = useState<GeoJSON>();

  //FETCH LOCATIONS
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/collection_points_map/locations.json').then((res) => res.json());
        dispatch(setLocationsState(response.locations));
      } catch (err) {
        console.error('locations failed to fetch: ', err);
      }
    };
    fetchLocations();
  }, [dispatch]);

  //CREATE POINTS FOR CLUSTERING
  useEffect(() => {
    //filter locations based on selected commodity type
    const filteredLocations: Location[] = locations.filter((location) => location.commodity.includes(Number(selectedType)));

    //locations prepared to be points on the map
    const points: GeoJSON = {
      type: 'FeatureCollection',
      features: filteredLocations.map((location: Location) => ({
        type: 'Feature',
        properties: location,
        geometry: {
          type: 'Point',
          coordinates: [location.lng, location.lat],
        },
      })),
    };
    setPoints(points);
  }, [locations, selectedType]);

  //MAP
  useEffect(() => {
    if (mapboxToken) {
      mapboxgl.accessToken = mapboxToken;
    }

    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [15.3386383, 50.0281361],
      zoom: 6.5,
    });

    //CLUSTER DATA DEFINITION
    mapRef.current.on('load', () => {
      if (mapRef.current !== null) {
        mapRef.current.addSource('locations', {
          type: 'geojson',
          data: initialData,
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
            'circle-stroke-color': '#000000',
          },
        });

        //inspect a cluster on click
        mapRef.current.on('click', 'clusters', (e) => {
          const features = mapRef.current?.queryRenderedFeatures(e.point as mapboxgl.PointLike, {
            layers: ['clusters'],
          });

          if (features && features[0].geometry.type === 'Point') {
            const { properties, geometry } = features[0];
            const clusterId = properties?.cluster_id;

            mapRef.current.getSource('locations').getClusterExpansionZoom(clusterId, (err: string, zoom: number) => {
              if (err || !mapRef.current) return;

              mapRef.current.easeTo({
                center: [geometry.coordinates[0], geometry.coordinates[1]],
                zoom: zoom,
              });
            });
          }
        });

        //once clicked on an unclustered point store updates and navigates to a selected point route
        mapRef.current.on('click', 'unclustered-point', (e) => {
          if (e.features) {
            const { properties } = e.features[0];
            let numbers: number[] = [];

            if (typeof properties?.commodity === 'string') {
              const stringNumbers: string[] = (properties?.commodity as string).replace(/[[\]]/g, '').split(',');
              numbers = stringNumbers.map((stringNumber: string) => Number(stringNumber));
            } else {
              numbers = properties?.commodity as number[];
            }

            const batteryType = commoditiesData.filter((commodity) => numbers.includes(commodity.id))[0].path;

            dispatch(setSelectedLocationState({ location: properties, selected: true }));
            navigate(`/collection_points_map/${batteryType}/locations/${properties?.id}`);

            mapRef.current &&
              mapRef.current.easeTo({
                center: [properties?.lng, properties?.lat],
                zoom: 14,
              });
          }
        });

        mapRef.current.on('mouseenter', 'clusters', () => {
          mapRef.current && (mapRef.current.getCanvas().style.cursor = 'pointer');
        });
        mapRef.current.on('mouseenter', 'unclustered-point', () => {
          mapRef.current && (mapRef.current.getCanvas().style.cursor = 'pointer');
        });
        mapRef.current.on('mouseleave', 'clusters', () => {
          mapRef.current && (mapRef.current.getCanvas().style.cursor = '');
        });
        mapRef.current.on('resize', () => {
          console.log('map resized');
        });
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      } else {
        return;
      }
    };
  }, []);

  //new source for data to be displayed on the map when selecting commodities
  useEffect(() => {
    if (mapRef.current && mapRef.current.getSource('locations')) {
      const source = mapRef.current.getSource('locations') as mapboxgl.GeoJSONSource;
      if (source && points) {
        source.setData(points);
      }
    }
  }, [points]);

  //map center change when a new location is selected in LocationCard
  useEffect(() => {
    if (selectedLocation.selected && mapRef.current) {
      const { lat, lng } = selectedLocation.location;
      mapRef.current.easeTo({
        center: [lng, lat],
        zoom: 14,
      });
    }
  }, [selectedLocation]);

  return <div id="map" ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};
