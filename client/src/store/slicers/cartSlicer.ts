import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

let baseURL = import.meta.env.VITE_BASE_URL;

interface cartState {
    cartItems:[],
    totalPrice:number
}

const initialCart: cartState = {
    cartItems:[],
    totalPrice:0
};

export const fetchCart = createAsyncThunk<any>(
    "cart/fetchCart",
    async () => {
        const response = await axios.get(`${baseURL}/cart/`,{withCredentials:true})
        console.log(response.data.data);
        return response.data.data;
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCart,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state: cartState, action) => {
            state.cartItems = action.payload.cartItems;
            state.totalPrice = action.payload.totalPrice;
        });
    }
});

export const {  } = cartSlice.actions;
export default cartSlice.reducer;
