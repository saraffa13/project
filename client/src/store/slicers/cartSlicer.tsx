import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

let baseURL = import.meta.env.VITE_BASE_URL;

interface cartState {
    cartItems: any,
    totalPrice: number,
    orders: any
}

const initialCart: cartState = {
    cartItems: [],
    totalPrice: 0,
    orders: []
};

export const fetchCart = createAsyncThunk<any>(
    "cart/fetchCart",
    async () => {
        const response = await axios.get(`${baseURL}/cart/`, { withCredentials: true })
        console.log(response.data.data);
        return response.data.data;
    }
);
export const fetchOrders = createAsyncThunk<any>(
    "cart/fetchOrders",
    async () => {
        const response = await axios.get(`${baseURL}/order/`, { withCredentials: true })
        console.log(response.data.data);
        return response.data.data;
    }
);


export const cartSlice = createSlice({

    name: 'cart',
    initialState: initialCart,

    reducers: {

        addToCart: (state: any, action: any) => {
            state.totalPrice += Number(action.payload.price)
            state.cartItems = [...state.cartItems, { item: action.payload.medicine, name: action.payload.medicine.name, quantity: 1 }]
        },

        deleteFromCart: (state: any, action: any) => {
            state.totalPrice -= action.payload.price * action.payload.quantity;
            state.cartItems = state.cartItems.filter((cartItem: any) => cartItem.item._id !== action.payload.id)
        },
        clearCart: (state: any) => {
            state.cartItems = [],
                state.totalPrice = 0
        },
        changeStatusOfOrder: (state: any, action) => {
            state.orders = state.orders.map((order: any) => {
                if (order._id === action.payload.orderId) {
                    return {
                        ...order,
                        status: action.payload.status,
                    }
                } else {
                    return order;
                }
            })
        },
        updateQuantity: (state: any, action: any) => {
            console.log(action.payload);
            if (action.payload.type === 'increment') {
                state.totalPrice += Number(action.payload.price);
            } else {
                state.totalPrice = Number(state.totalPrice) - Number(action.payload.price);
            }
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
        builder.addCase(fetchOrders.fulfilled, (state: cartState, action) => {
            state.orders = action.payload
        });
    }

});

export const { updateQuantity, addToCart, deleteFromCart, clearCart, changeStatusOfOrder } = cartSlice.actions;
export default cartSlice.reducer;