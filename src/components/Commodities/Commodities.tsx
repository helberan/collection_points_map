import { CommodityCard } from './CommodityCard';
import { useEffect, useState } from 'react';
import commoditiesData from './commodities.json';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/index';
import { setSelectedTypesState } from '../../store/selectedTypeSlice';

export const Commodities = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedCardIds = useSelector((state: RootState) => state.selectedTypes.selectedTypes);

  const [localSelectedCardIds, setLocalSelectedCardIds] = useState<number[]>(selectedCardIds);

  //updates selected commodity type state in store based on card/commodity id
  const handleCheck = (cardId: number) => {
    setLocalSelectedCardIds((prevSelectedIds) =>
      prevSelectedIds.includes(cardId) ? prevSelectedIds.filter((id) => id !== cardId) : [...prevSelectedIds, cardId]
    );
  };

  //updates selected commodity type state after each select
  useEffect(() => {
    dispatch(setSelectedTypesState(localSelectedCardIds));
  }, [localSelectedCardIds, dispatch]);

  useEffect(() => {
    setLocalSelectedCardIds(selectedCardIds);
  }, [selectedCardIds]);

  return (
    <div className="Main">
      <h2>Jaké baterie chcete odevzdat?</h2>
      <div className="Commodity-cards-wrapper">
        {commoditiesData.map((commodity) => (
          <CommodityCard
            key={commodity.id}
            commodity={commodity}
            handleCheck={handleCheck}
            isSelected={localSelectedCardIds.includes(commodity.id)}
          />
        ))}
      </div>
    </div>
  );
};
