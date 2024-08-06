import { useState } from 'react';
import './CommodityCard.css';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
}

export const CommodityCard: React.FC<CommodityCardProps> = ({ commodity, handleCheck }) => {
  const images = [portableBattery, smallChargableBattery, lmtBattery, carAndOtherBattery, evAndIndustrialBattery];
  const [checked, setChecked] = useState<boolean>(false);

  const handleCardCheck = (id: number) => {
    handleCheck(id);
    setChecked(!checked);
  };

  return (
    <div>
      <div className="commodity-card-wrapper">
        {/* -----FRONT----- */}
        <Card className={checked ? 'commodity-card-selected' : 'commodity-card'} onClick={() => handleCardCheck(commodity.id)}>
          <CardMedia sx={{ height: 143 }} image={images[commodity.id]} title={commodity.categoryName} />
          <CardContent>
            <Typography sx={{ fontSize: '1rem' }}>{commodity.categoryName}</Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Detail</Button>
          </CardActions> */}
        </Card>
      </div>
    </div>
  );
};
