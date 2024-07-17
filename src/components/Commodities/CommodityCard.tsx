import evAndIndustrialBattery from '../../assets/baterie_velke_akumulatory.png';
import smallChargableBattery from '../../assets/baterie_male dobijeci.png';
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

  return (
    <div className="Commodity-card">
      <Card sx={{ maxWidth: 345 }}>
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
  );
};
