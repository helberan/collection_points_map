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
      <h2>Jaké baterie chcete odevzdat?</h2>
      <div className="Commodity-cards-wrapper">
        {commoditiesData.map((commodity) => (
          <CommodityCard key={commodity.id} commodity={commodity} handleCheck={handleCheck} />
        ))}
      </div>
    </div>
  );
};
