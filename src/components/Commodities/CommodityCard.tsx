import { useState } from 'react';
import './CommodityCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import evAndIndustrialBattery from '../../assets/baterie_velke_akumulatory.png';
import smallChargableBattery from '../../assets/baterie_male_dobijeci.png';
import carAndOtherBattery from '../../assets/baterie_mokre_a_startovaci.png';
import portableBattery from '../../assets/baterie_prenosne_spotrebitelske.png';
import lmtBattery from '../../assets/baterie_z_elektrokol.png';

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
        {/* -----FRONT----- */}
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

        {/* -----BACK----- */}
        <Card className="flip-card-back" sx={{ maxWidth: 345 }}>
          <CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton size="small" onClick={handleFlip}>
                <CloseIcon />
              </IconButton>
            </CardActions>
            <Typography variant="h6" component="div">
              {commodity.categoryName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {commodity.description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
