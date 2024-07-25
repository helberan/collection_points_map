import { useState } from 'react';
import './CommodityCard.css';
import evAndIndustrialBattery from '../../assets/baterie_velke_akumulatory.png';
import smallChargableBattery from '../../assets/baterie_male_dobijeci.png';
import carAndOtherBattery from '../../assets/baterie_mokre_a_startovaci.png';
import portableBattery from '../../assets/baterie_prenosne_spotrebitelske.png';
import lmtBattery from '../../assets/baterie_z_elektrokol.png';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface CommodityCardProps {
  id: number;
  pb: boolean;
  ib: boolean;
  ab: boolean;
  categoryName: string;
  description: string;
}

export const CommodityCard = ({ commodity }: { commodity: CommodityCardProps }) => {
  const images = [portableBattery, smallChargableBattery, lmtBattery, carAndOtherBattery, evAndIndustrialBattery];

  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
      <div className="flip-card-inner">
        <Card className="flip-card-front">
          <CardMedia sx={{ height: 200 }} image={images[commodity.id]} title={commodity.categoryName} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {commodity.categoryName}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleFlip}>
              Detail
            </Button>
          </CardActions>
        </Card>
        <Card className="flip-card-back" sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {commodity.categoryName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {commodity.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleFlip}>
              Back
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
