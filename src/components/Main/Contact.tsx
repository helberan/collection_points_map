import Typography from '@mui/material/Typography';

export const Contact = () => {
  return (
    <div className="Main">
      <Typography variant="h2" sx={{ fontSize: '1.5rem', height: '40px', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        O nás
      </Typography>

      <article>
        ECOBAT je česká neziskově hospodařící společnost, která již přes 20 let zajišťuje komplexní služby spojené se zpětným odběrem baterií. V roce
        2022 se stala první společností v České republice, která získala nové oprávnění od Ministerstva životního prostředí k provozování kolektivního
        systému pro zpětný odběr odpadních baterií v České republice. ECOBAT organizuje sběr všech odpadních baterií – od monočlánků přes baterie z
        elektrokol, AKU nářadí nebo fotovoltaických systémů až po autobaterie a baterie z elektromobilů. Zajišťuje také proces jejich třídění a
        následné recyklace. Odpadní baterie lze odevzdat na více než 28 000 sběrných místech po celé České republice. ECOBAT je mimo jiné také zapojen
        do aktivit ČAObH, je členem evropské asociace EUCOBAT sdružující národní systémy zajišťující sběr baterií a partnerem evropského sdružení
        RENEOS, které pro výrobce baterií zajišťuje sběr, opakované použití, přepravu a recyklaci lithiových baterií.
      </article>

      <p>
        ECOBAT s.r.o.
        <br />
        Soborská 1302/8
        <br />
        160 00 Praha 6
        <br />
        tel. 233 332 787
        <br />
        <a href="https://www.ecobat.cz/" target="_blank">
          www.ecobat.cz
        </a>
        <br />
        <a href="mailto:ecobat@ecobat.cz">ecobat@ecobat.cz</a>
      </p>
    </div>
  );
};
