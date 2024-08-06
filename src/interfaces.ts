export interface Location {
  id: number | undefined;
  kod_provozovny: string;
  nazev_provozovny: string;
  subjekt: string;
  kod_smlouvy: string;
  mesto: string;
  mesto_cast: string;
  ulice: string;
  psc: string;
  typ_provozovny: string;
  obec: string;
  nazev_okresu: string;
  nazev_kraje: string;
  kategorie_provozovny: string;
  shromazdovaci_misto: boolean | undefined;
  verejne_misto: boolean | undefined;
  lat: number;
  lng: number;
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
    kod_smlouvy: string;
    mesto: string;
    mesto_cast: string;
    ulice: string;
    psc: string;
    typ_provozovny: string;
    obec: string;
    nazev_okresu: string;
    nazev_kraje: string;
    kategorie_provozovny: string;
    shromazdovaci_misto: boolean | undefined;
    verejne_misto: boolean | undefined;
    lat: number;
    lng: number;
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
