import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './locationsSlice';
import selectedLocationReducer from './selectedLocationSlice';
import selectedTypesReducer from './selectedTypeSlice';

const store = configureStore({
  reducer: {
    locations: locationsReducer,
    selectedLocation: selectedLocationReducer,
    selectedTypes: selectedTypesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
