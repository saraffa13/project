import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let baseURL = import.meta.env.VITE_BASE_URL;

const initialMedicineList = {
	medicines: [],
};

export const fetchMedicines = createAsyncThunk(
	"medicine/fetchMedicines",
	async () => {
		const response = await axios.get(`${baseURL}/medicine`);
		console.log(response.data.data);
		return response.data.data;
	}
);

export const medicineSlice = createSlice({
	name: "medicine",
	initialState: initialMedicineList,
	reducers: {
		deleteMedicine: (state, action) => {
			state.medicines = state.medicines.filter(
				(medicine) => medicine._id !== action.payload.medicineId
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchMedicines.fulfilled,
			(state, action) => {
				console.log(action.payload);
				state.medicines = action.payload;
			}
		);
	},
});

export const { deleteMedicine } = medicineSlice.actions;
export default medicineSlice.reducer;
