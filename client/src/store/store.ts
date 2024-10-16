import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import authSlicer from './slicers/authSlicer';
import medicineSlicer from './slicers/medicineSlicer';
import cartSlice from './slicers/cartSlicer';

export const store = configureStore({
    reducer: {
        auth: authSlicer,
        medicine: medicineSlicer,
        cart:cartSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;