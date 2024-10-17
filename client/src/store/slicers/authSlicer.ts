import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

let baseURL = import.meta.env.VITE_BASE_URL;


interface UserState {
    email: string;
    password: string;
    loggedIn: boolean;
    language:string,
    languageKeyWords:any
}


const initialUser: UserState = {
    email: "",
    password: "",
    loggedIn: false,
    language:"english",
    languageKeyWords:{}
};

export const checkLanguage = createAsyncThunk<string>(
    "auth/checkLanguage",
    async () => {
        const language = await localStorage.getItem('language');
        if(language)return language;
        else{
            await localStorage.setItem('language','english');
            return 'english'
        }
    }
);
export const checkUserName = createAsyncThunk<boolean>(
    "auth/checkUserName",
    async () => {
        const loggedIn = await localStorage.getItem('loggedIn');
        if(loggedIn && loggedIn === 'true')return true;
        else return false;
    }
);


export const getKeyWords = createAsyncThunk<boolean>(
    "auth/getKeyWords",
    async () => {
        const response = await axios.get(`${baseURL}/translation/`, { withCredentials: true })
        console.log(response.data);
        return response.data.data[0].translations
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
        changeLanguage: (state:any, action:any)=>{
            state.language = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkLanguage.fulfilled, (state: UserState, action) => {
            state.language = action.payload;
        });
        builder.addCase(checkUserName.fulfilled, (state: UserState, action) => {
            state.loggedIn = action.payload;
        });
        builder.addCase(getKeyWords.fulfilled, (state: UserState, action) => {
            state.languageKeyWords = action.payload;
        });
    }
});


export const { login, logout, changeLanguage } = authSlice.actions;
export default authSlice.reducer;
