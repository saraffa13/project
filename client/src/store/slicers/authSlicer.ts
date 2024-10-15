import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    email: string;
    password: string; 
    loggedIn: boolean;
}

const initialUser: UserState = {
    email: "",
    password: "",
    loggedIn: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialUser,
    reducers: {
        login: (state, action: PayloadAction<{ email: string; password: string }>) => {
            state.email = action.payload.email;
            state.password = action.payload.password; 
            state.loggedIn = true;
        },
        logout: (state) => {
            state.email = "";
            state.password = "";
            state.loggedIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
