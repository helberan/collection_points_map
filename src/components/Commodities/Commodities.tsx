import { CommodityCard } from './CommodityCard';
import { useEffect, useState } from 'react';
import commoditiesData from './commodities.json';

interface SelectedCard {
  id: number;
  checked: boolean;
}

export const Commodities = () => {
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([
    { id: 0, checked: false },
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
    { id: 4, checked: false },
  ]);

  const handleCheck = (cardId: number) => {
    setSelectedCards((cards) => cards.map((card) => (card.id === cardId ? { ...card, checked: !card.checked } : card)));
  };

  useEffect(() => {
    console.log(selectedCards);
  }, [selectedCards]);

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
