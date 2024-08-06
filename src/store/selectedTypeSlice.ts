import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedTypes {
  selectedTypes: number[];
}

const initialState: SelectedTypes = {
  selectedTypes: [],
};

const selectedTypesSlice = createSlice({
  name: 'locationsSlice',
  initialState,
  reducers: {
    setSelectedTypesState(state, action: PayloadAction<number[]>) {
      state.selectedTypes = action.payload;
    },
  },
});

export const { setSelectedTypesState } = selectedTypesSlice.actions;
export default selectedTypesSlice.reducer;
