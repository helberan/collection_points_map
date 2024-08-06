import './CommodityCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import evAndIndustrialBattery from '../../assets/baterie_velke_akumulatory.png';
import smallChargableBattery from '../../assets/baterie_male_dobijeci.png';
import carAndOtherBattery from '../../assets/baterie_mokre_a_startovaci.png';
import portableBattery from '../../assets/baterie_prenosne_spotrebitelske.png';
import lmtBattery from '../../assets/baterie_z_elektrokol.png';

interface CommodityCardProps {
  commodity: {
    id: number;
    pb: boolean;
    ib: boolean;
    ab: boolean;
    categoryName: string;
    description: string;
  };
  handleCheck: (cardId: number) => void;
  isSelected: boolean;
}

export const CommodityCard: React.FC<CommodityCardProps> = ({ commodity, handleCheck, isSelected }) => {
  const images = [portableBattery, smallChargableBattery, lmtBattery, carAndOtherBattery, evAndIndustrialBattery];

  return (
    <Card className={isSelected ? 'commodity-card selected' : 'commodity-card'} onClick={() => handleCheck(commodity.id)}>
      <CardContent sx={{ display: 'flex' }}>
        <img src={images[commodity.id]} alt={commodity.categoryName} />
        <div className="commodity-card-inner">
          <Typography variant="h4" component="div" sx={{ fontSize: 17, marginBottom: '0.5rem' }}>
            {commodity.categoryName}
          </Typography>
          <Typography sx={{ fontSize: 13.5 }} color="text.secondary">
            {commodity.description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
