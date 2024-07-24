import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../interfaces';

export interface Locations {
  locations: Location[];
}

const initialState: Locations = {
  locations: [
    {
      kod_provozovny: '',
      nazev_provozovny: '',
      subjekt: '',
      datum_vyrazeni: '',
      kod_smlouvy: '',
      mesto: '',
      mesto_cast: '',
      ulice: '',
      psc: '',
      typ_provozovny: '',
      kod_pro_import: '',
      obec: '',
      nazev_okresu: '',
      nazev_kraje: '',
      telefon: '',
      eMail: '',
      nadrazena_provozovna: '',
      poznamka: '',
      kategorie_provozovny: '',
      shromazdovaci_misto: undefined,
      verejne_misto: undefined,
      skupina_sazebniku_odmen_za_svozy: '',
      datum_zarazeni_provozovny_do_szo: '',
      lat: 0,
      lng: 0,
      potencialni_riziko: '',
      projekt: '',
      bezp_pokyny_schvaleno: '',
      poznamka_obsluznost: '',
      poznamka_baterie: '',
      prumyslove: undefined,
      prenosne: undefined,
      automobilove: undefined,
    },
  ],
};

const locationsSlice = createSlice({
  name: 'locationsSlice',
  initialState,
  reducers: {
    setLocationsState(state, action: PayloadAction<Location[]>) {
      state.locations = action.payload;
    },
  },
});

export const { setLocationsState } = locationsSlice.actions;
export default locationsSlice.reducer;
