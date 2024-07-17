import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

export const Map = () => {
  const openStreetMapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const center: LatLngExpression = [49.8882525, 15.531435];

  return (
    <div className="Map">
      <MapContainer center={center} zoom={8} style={{ height: '100%', width: '100%' }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={openStreetMapUrl} />
      </MapContainer>
    </div>
  );
};
