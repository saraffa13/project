import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

let baseURL = import.meta.env.VITE_BASE_URL;

const initialCart= {
    cartItems: [],
    totalPrice: 0,
    orders: []
};

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async () => {
        const response = await axios.get(`${baseURL}/cart/`, { withCredentials: true })
        console.log(response.data.data);
        return response.data.data;
    }
);
export const fetchOrders = createAsyncThunk(
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

        addToCart: (state, action) => {
            state.totalPrice += Number(action.payload.price)
            state.cartItems = [...state.cartItems, { item: action.payload.medicine, name: action.payload.medicine.name, quantity: 1 }]
        },

        deleteFromCart: (state, action) => {
            state.totalPrice -= action.payload.price * action.payload.quantity;
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.item._id !== action.payload.id)
        },
        clearCart: (state) => {
            state.cartItems = [],
                state.totalPrice = 0
        },
        changeStatusOfOrder: (state, action) => {
            state.orders = state.orders.map((order) => {
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
        updateQuantity: (state, action) => {
            console.log(action.payload);
            if (action.payload.type === 'increment') {
                state.totalPrice += Number(action.payload.price);
            } else {
                state.totalPrice = Number(state.totalPrice) - Number(action.payload.price);
            }
            state.cartItems = state.cartItems.map((cartItem) => cartItem.item._id === action.payload.id ? {
                ...cartItem,
                quantity: cartItem.quantity + (action.payload.type === 'increment' ? +1 : -1)
            } : cartItem)
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.cartItems = action.payload.cartItems;
            state.totalPrice = action.payload.totalPrice;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.orders = action.payload
        });
    }

});

export const { updateQuantity, addToCart, deleteFromCart, clearCart, changeStatusOfOrder } = cartSlice.actions;
export default cartSlice.reducer;