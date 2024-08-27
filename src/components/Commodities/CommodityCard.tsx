import './CommodityCard.css';
import { useNavigate } from 'react-router-dom';
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
    path: string;
    categoryName: string;
    description: string;
  };
  clickable: boolean;
  handleCheck?: (cardId: number) => void;
}

const images = [portableBattery, smallChargableBattery, lmtBattery, carAndOtherBattery, evAndIndustrialBattery];

export const CommodityCard = ({ commodity, clickable, handleCheck }: CommodityCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate(`/collection_points_map/${commodity.path}/locations`);
      if (handleCheck) {
        handleCheck(commodity.id);
      }
    }
  };

  return (
    <Card className={`commodity-card ${clickable ? 'clickable' : ''}`} onClick={handleClick}>
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
