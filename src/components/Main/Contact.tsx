import Typography from '@mui/material/Typography';

export const Contact = () => {
  return (
    <div className="Main">
      <Typography variant="h2" sx={{ fontSize: '1.5rem', height: '40px', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        Kontakt
      </Typography>
      <p>
        ECOBAT s.r.o.
        <br />
        Soborská 1302/8
        <br />
        160 00 Praha 6
        <br />
        tel. 233 332 787
        <br />
        www.ecobat.cz
        <br />
        ecobat@ecobat.cz
      </p>
    </div>
  );
};
