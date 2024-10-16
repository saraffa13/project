import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const checkUserName = createAsyncThunk<boolean>(
    "auth/checkUserName",
    async () => {
        const loggedIn = await localStorage.getItem('loggedIn');
        if(loggedIn && loggedIn === 'true')return true;
        else return false;
    }
);

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
    extraReducers: (builder) => {
        builder.addCase(checkUserName.fulfilled, (state: UserState, action) => {
            state.loggedIn = action.payload;
        });
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
