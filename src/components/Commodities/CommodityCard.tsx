import { useState } from 'react';
import './CommodityCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import evAndIndustrialBattery from '../../assets/baterie_velke_akumulatory.png';
import smallChargableBattery from '../../assets/baterie_male_dobijeci.png';
import carAndOtherBattery from '../../assets/baterie_mokre_a_startovaci.png';
import portableBattery from '../../assets/baterie_prenosne_spotrebitelske.png';
import lmtBattery from '../../assets/baterie_z_elektrokol.png';
import { CheckBox } from '@mui/icons-material';

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
}

export const CommodityCard: React.FC<CommodityCardProps> = ({ commodity, handleCheck }) => {
  const images = [portableBattery, smallChargableBattery, lmtBattery, carAndOtherBattery, evAndIndustrialBattery];

  return (
    <div>
      <div className="flip-card-inner">
        {/* -----FRONT----- */}
        <Card className="flip-card-front" onClick={() => handleCheck(commodity.id)}>
          <CardMedia sx={{ height: 200 }} image={images[commodity.id]} title={commodity.categoryName} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {commodity.categoryName}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Detail</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
