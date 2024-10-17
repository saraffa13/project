import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

let baseURL = import.meta.env.VITE_BASE_URL;

interface cartState {
    cartItems: [],
    totalPrice: number
}

const initialCart: cartState = {
    cartItems: [],
    totalPrice: 0
};

export const fetchCart = createAsyncThunk<any>(
    "cart/fetchCart",
    async () => {
        const response = await axios.get(`${baseURL}/cart/`, { withCredentials: true })
        console.log(response.data.data);
        return response.data.data;
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCart,
    reducers: {
        addToCart: (state: any, action: any) => {
            state.cartItems = [...state.cartItems, {item:action.payload.medicine, name:action.payload.medicine.name, quantity:1}]
        },

        deleteFromCart: (state: any, action: any) => {
             state.cartItems = state.cartItems.filter((cartItem: any) => cartItem.item._id !== action.payload.id)
        },

        updateQuantity: (state: any, action: any) => {
            console.log(action.payload);
            state.cartItems = state.cartItems.map((cartItem: any) => cartItem.item._id === action.payload.id ? {
                ...cartItem,
                quantity: cartItem.quantity + (action.payload.type === 'increment' ? +1 : -1)
            } : cartItem)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state: cartState, action) => {
            state.cartItems = action.payload.cartItems;
            state.totalPrice = action.payload.totalPrice;
        });
    }
});

export const { updateQuantity, addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;