import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './locationsSlice';
import selectedLocationReducer from './selectedLocationSlice';

const store = configureStore({
  reducer: {
    locations: locationsReducer,
    selectedLocation: selectedLocationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
