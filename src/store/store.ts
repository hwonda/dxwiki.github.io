import { configureStore } from '@reduxjs/toolkit';
import termsReducer from './termsSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    terms: termsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;