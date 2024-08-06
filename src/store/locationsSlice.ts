import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../interfaces';

export interface Locations {
  locations: Location[];
}

const initialState: Locations = {
  locations: [
    {
      id: undefined,
      kod_provozovny: '',
      nazev_provozovny: '',
      subjekt: '',
      kod_smlouvy: '',
      mesto: '',
      mesto_cast: '',
      ulice: '',
      psc: '',
      typ_provozovny: '',
      obec: '',
      nazev_okresu: '',
      nazev_kraje: '',
      kategorie_provozovny: '',
      shromazdovaci_misto: undefined,
      verejne_misto: undefined,
      lat: 0,
      lng: 0,
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
