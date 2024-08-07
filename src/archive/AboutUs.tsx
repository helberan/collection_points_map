import transportBox from '../../assets/transport_box_ruka.jpg';

export const AboutUs = () => {
  return (
    <div className="Main">
      <h2>Interaktivní mapa sběrných míst</h2>
      <p>
        Mapa sběrných míst vám pomůže nalézt nejbližší sběrný box, kam můžete odevzdat použité baterie (tužkové, knoflíkové, monočlánky
        i&nbsp;akumulátory).
      </p>
      <p>
        Zadejte lokalitu, která vás zajímá, a&nbsp;zobrazí se&nbsp;vám všechna sběrná místa v&nbsp;okolí. V&nbsp;Seznamu míst můžete jednoduše pomocí
        filtru vyhledat místo podle názvu ulice, obce nebo&nbsp;PSČ.
      </p>
      <img src={transportBox} alt="sběrná nádoba" style={{ height: '15rem', width: 'auto' }} />
    </div>
  );
};
