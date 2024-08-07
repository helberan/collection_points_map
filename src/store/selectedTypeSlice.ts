import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number | unknown = null;

const selectedTypeSlice = createSlice({
  name: 'selectedTypeSlice',
  initialState,
  reducers: {
    setSelectedTypeState(state, action: PayloadAction<number>) {
      return action.payload;
    },
  },
});

export const { setSelectedTypeState } = selectedTypeSlice.actions;
export default selectedTypeSlice.reducer;
