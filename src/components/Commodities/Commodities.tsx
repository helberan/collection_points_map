import Typography from '@mui/material/Typography';
import { CommodityCard } from './CommodityCard';
import commoditiesData from './commodities.json';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/index';
import { setSelectedTypeState } from '../../store/selectedTypeSlice';

export const Commodities = () => {
  const dispatch: AppDispatch = useDispatch();

  //updates selected commodity type state in store based on card/commodity id
  const handleCheck = (cardId: number) => {
    dispatch(setSelectedTypeState(cardId));
  };

  return (
    <div className="Main">
      <Typography variant="h2" sx={{ fontSize: '1.5rem', height: '40px', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        Jaké baterie chcete odevzdat?
      </Typography>
      <div className="Commodity-cards-wrapper">
        {commoditiesData.map((commodity) => (
          <CommodityCard key={commodity.id} commodity={commodity} clickable={true} handleCheck={handleCheck} />
        ))}
      </div>
    </div>
  );
};
