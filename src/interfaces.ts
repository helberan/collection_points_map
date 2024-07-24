export interface Location {
  id: number | undefined;
  kod_provozovny: string;
  nazev_provozovny: string;
  subjekt: string;
  datum_vyrazeni: string;
  kod_smlouvy: string;
  mesto: string;
  mesto_cast: string;
  ulice: string;
  psc: string;
  typ_provozovny: string;
  kod_pro_import: string;
  obec: string;
  nazev_okresu: string;
  nazev_kraje: string;
  telefon: string;
  eMail: string;
  nadrazena_provozovna: string;
  poznamka: string;
  kategorie_provozovny: string;
  shromazdovaci_misto: boolean | undefined;
  verejne_misto: boolean | undefined;
  skupina_sazebniku_odmen_za_svozy: string;
  datum_zarazeni_provozovny_do_szo: string;
  lat: number;
  lng: number;
  potencialni_riziko: string;
  projekt: string;
  bezp_pokyny_schvaleno: string;
  poznamka_obsluznost: string;
  poznamka_baterie: string;
  prumyslove: boolean | undefined;
  prenosne: boolean | undefined;
  automobilove: boolean | undefined;
}

export interface SelectedLocation {
  location: {
    id: number | undefined;
    kod_provozovny: string;
    nazev_provozovny: string;
    subjekt: string;
    datum_vyrazeni: string;
    kod_smlouvy: string;
    mesto: string;
    mesto_cast: string;
    ulice: string;
    psc: string;
    typ_provozovny: string;
    kod_pro_import: string;
    obec: string;
    nazev_okresu: string;
    nazev_kraje: string;
    telefon: string;
    eMail: string;
    nadrazena_provozovna: string;
    poznamka: string;
    kategorie_provozovny: string;
    shromazdovaci_misto: boolean | undefined;
    verejne_misto: boolean | undefined;
    skupina_sazebniku_odmen_za_svozy: string;
    datum_zarazeni_provozovny_do_szo: string;
    lat: number;
    lng: number;
    potencialni_riziko: string;
    projekt: string;
    bezp_pokyny_schvaleno: string;
    poznamka_obsluznost: string;
    poznamka_baterie: string;
    prumyslove: boolean | undefined;
    prenosne: boolean | undefined;
    automobilove: boolean | undefined;
  };
  selected: boolean;
}

export interface Point {
  type: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: {
    type: string;
    properties: Location;
    geometry: {
      type: string;
      coordinates: [number, number];
    };
  }[];
}
