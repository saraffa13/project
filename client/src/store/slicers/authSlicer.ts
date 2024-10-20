import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

let baseURL = import.meta.env.VITE_BASE_URL;


interface UserState {
    email: string;
    password: string;
    loggedIn: boolean;
    language:string,
    languageKeyWords:any,
    role:any,
    users:any,
}


const initialUser: UserState = {
    email: "",
    password: "",
    loggedIn: false,
    language:"english",
    languageKeyWords:{},
    role:"user",
    users:[]
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

export const checkUserName = createAsyncThunk<any>(
    "auth/checkUserName",
    async () => {
        const loggedIn = await localStorage.getItem('loggedIn');
        if(loggedIn && loggedIn === 'true'){
            const response = await axios.get(`${baseURL}/user/get-user`, { withCredentials: true })
            console.log(response.data.data);
            return response.data.data

        }
        else return false;
    }
);


export const getKeyWords = createAsyncThunk<boolean>(
    "auth/getKeyWords",
    async () => {
        const response = await axios.get(`${baseURL}/translation/`, { withCredentials: true })
        return response.data.data[0].translations
    }
);

export const getUsers = createAsyncThunk<any>(
    "auth/getUsers",
    async () => {
        const response = await axios.get(`${baseURL}/user/get-all-users`, { withCredentials: true })
        console.log(response.data.data);
        return response.data.data
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
        deleteUser: (state, action) => {
            console.log(action);
            state.users = state.users.filter((user:any)=>user._id!=action.payload)
            
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
            console.log(action.payload);
            if(action.payload === false){
                state.loggedIn = false;
            }else{
                state.email = action.payload.email,
                state.role = action.payload.role
                state.loggedIn = true;
            }
        });
        builder.addCase(getKeyWords.fulfilled, (state: UserState, action) => {
            state.languageKeyWords = action.payload;
        });

        builder.addCase(getUsers.fulfilled, (state: UserState, action) => {
            state.users = action.payload;
        });
    }
});


export const { login, logout, changeLanguage, deleteUser } = authSlice.actions;
export default authSlice.reducer;
