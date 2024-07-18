import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './locationsSlice';

const store = configureStore({
  reducer: {
    locations: locationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
