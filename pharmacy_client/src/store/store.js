import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
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


export const useDispatch = () => useReduxDispatch();
export const useSelector = useReduxSelector;

export default store;