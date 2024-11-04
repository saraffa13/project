import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let baseURL = import.meta.env.VITE_BASE_URL;

const initialUser = {
	email: "",
	loggedIn: false,
	language: "english",
	languageKeyWords: {},
	role: "user",
	users: [],
	notification: [],
};

export const checkLanguage = createAsyncThunk(
	"auth/checkLanguage",
	async () => {
		const language = await localStorage.getItem("language");
		if (language) return language;
		else {
			await localStorage.setItem("language", "english");
			return "english";
		}
	}
);

export const checkUserName = createAsyncThunk(
	"auth/checkUserName",
	async () => {
		const loggedIn = localStorage.getItem("loggedIn");
		if (loggedIn && loggedIn === "true") {
			try {
				const response = await axios.get(`${baseURL}/user/get-user`, {
					withCredentials: true,
				});
				localStorage.setItem("role", response.data.data.role);
				return response.data.data;
			} catch (error) {
				console.log(error);
				throw new Error("Error");
			}
		} else {
			return false;
		}
	}
);

export const getKeyWords = createAsyncThunk(
	"auth/getKeyWords",
	async () => {
		const response = await axios.get(`${baseURL}/translation`, {
			withCredentials: true,
		});
		return response.data.data[0].translations;
	}
);

export const getNotification = createAsyncThunk(
	"auth/getNotification",
	async () => {
		const response = await axios.get(`${baseURL}/user/notification`, {
			withCredentials: true,
		});
		console.log(response.data.data);
		return response.data.data;
	}
);

export const getUsers = createAsyncThunk("auth/getUsers", async () => {
	const response = await axios.get(`${baseURL}/user/get-all-users`, {
		withCredentials: true,
	});
	console.log(response.data.data);
	return response.data.data;
});

export const authSlice = createSlice({
	name: "auth",
	initialState: initialUser,
	reducers: {
		login: (
			state,
			action
		) => {
			localStorage.setItem("loggedIn", "true");
			state.email = action.payload.email;
			state.loggedIn = true;
		},
		logout: (state) => {
			localStorage.setItem("loggedIn", "false");
			localStorage.setItem("role", "");
			state.email = "";
			state.loggedIn = false;
		},
		deleteUser: (state, action) => {
			state.users = state.users.filter(
				(user) => user._id != action.payload
			);
		},
		activateUser: (state, action) => {
			state.users = state.users.map((user) => {
				if (user._id != action.payload.userId) return user;
				else {
					if (action.payload.activate === true) {
						user.isActive = true;
					} else {
						user.blacklisted = true;
					}
					return user;
				}
			});
		},
		blacklistUser: (state, action) => {
			state.users = state.users.map((user) => {
				if (user._id != action.payload) return user;
				else {
					user.blacklisted = true;
					return user;
				}
			});
		},
		removeFromBlacklist: (state, action) => {
			state.users = state.users.map((user) => {
				if (user._id != action.payload.userId) return user;
				else {
					user.blacklisted = false;
					return user;
				}
			});
		},
		changeLanguage: (state, action) => {
			state.language = action.payload;
		},
		markNotificationAsRead: (state, action) => {
			state.notification = state.notification.map((notify) => {
				if (notify._id === action.payload) {
					notify.read = true;
				}
				return notify;
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(checkLanguage.fulfilled, (state, action) => {
			state.language = action.payload;
		});
		builder.addCase(checkUserName.fulfilled, (state, action) => {
			if (action.payload === false) {
				state.loggedIn = false;
			} else {
				localStorage.setItem("loggedIn", "true");
				(state.email = action.payload.email),
					(state.role = action.payload.role);
				console.log(action.payload);
				state.notification = action.payload.notifications;
				state.loggedIn = true;
			}
		});
		builder.addCase(checkUserName.rejected, (state) => {
			state.loggedIn = false;
			localStorage.setItem("loggedIn", "false");
			localStorage.setItem("role", "");
		});
		builder.addCase(getKeyWords.fulfilled, (state, action) => {
			state.languageKeyWords = action.payload;
		});

		builder.addCase(getUsers.fulfilled, (state, action) => {
			console.log(action.payload);
			state.users = action.payload;
		});
	},
});

export const {
	login,
	logout,
	changeLanguage,
	deleteUser,
	activateUser,
	removeFromBlacklist,
	blacklistUser,
	markNotificationAsRead,
} = authSlice.actions;
export default authSlice.reducer;
