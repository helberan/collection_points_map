import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const SelectedLocation = () => {
  const { batteryType, id } = useParams<{ batteryType: string; id: string }>();
  const selectedLocation = useSelector((state: RootState) => state.selectedLocation);

  if (selectedLocation.location.id !== Number(id)) {
    return <div>Location not found or not selected</div>;
  }

  return (
    <div className="Main">
      <Link to={`/${batteryType}/locations`}>Zpět</Link>
      <p>{selectedLocation.location.nazev_provozovny}</p>
      <p>{selectedLocation.location.ulice}</p>
      <p>{selectedLocation.location.obec}</p>
      <p>{selectedLocation.location.psc}</p>
      <p>{selectedLocation.location.commodity}</p>
    </div>
  );
};
