import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

export const SelectedLocation = () => {
  const selectedLocation = useSelector((state: RootState) => state.selectedLocation);

  return <p>{selectedLocation.location.nazev_provozovny}</p>;
};
