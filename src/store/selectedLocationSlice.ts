import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedLocation } from '../interfaces';

const initialState: SelectedLocation = {
  location: {
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
    commodity: [],
  },
  selected: false,
};

const selectedLocationSlice = createSlice({
  name: 'selectedLocation',
  initialState,
  reducers: {
    setSelectedLocationState(state, action: PayloadAction<SelectedLocation>) {
      //state = action.payload;
      return action.payload;
    },
  },
});

export const { setSelectedLocationState } = selectedLocationSlice.actions;
export default selectedLocationSlice.reducer;
