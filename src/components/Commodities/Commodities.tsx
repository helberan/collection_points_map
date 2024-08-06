import { CommodityCard } from './CommodityCard';
import { useEffect, useState } from 'react';
import commoditiesData from './commodities.json';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/index';
import { setSelectedTypesState } from '../../store/selectedTypeSlice';

export const Commodities = () => {
  const dispatch: AppDispatch = useDispatch();

  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);

  //updates selected commodity type state in store based on card/commodity id
  const handleCheck = (cardId: number) => {
    setSelectedCardIds((prevSelectedIds) =>
      prevSelectedIds.includes(cardId) ? prevSelectedIds.filter((id) => id !== cardId) : [...prevSelectedIds, cardId]
    );
  };

  //updates selected commodity type state after each select
  useEffect(() => {
    dispatch(setSelectedTypesState(selectedCardIds));
  }, [selectedCardIds, dispatch]);

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
