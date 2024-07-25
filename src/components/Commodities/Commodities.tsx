import { CommodityCard } from './CommodityCard';
import commoditiesData from './commodities.json';

export const Commodities = () => {
  return (
    <div className="Main">
      <h2>Co se sbírá</h2>
      <div className="Commodity-cards-wrapper">
        {commoditiesData.map((commodity) => (
          <CommodityCard key={commodity.id} commodity={commodity} />
        ))}
      </div>
    </div>
  );
};
