// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slicers/authSlicer'; 

export const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AuthState = ReturnType<typeof authReducer>;
