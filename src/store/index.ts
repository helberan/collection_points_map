import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './locationsSlice';
import selectedLocationReducer from './selectedLocationSlice';
import selectedTypeReducer from './selectedTypeSlice';

const store = configureStore({
  reducer: {
    locations: locationsReducer,
    selectedLocation: selectedLocationReducer,
    selectedType: selectedTypeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
