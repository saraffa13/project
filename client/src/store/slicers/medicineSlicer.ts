import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let baseURL = import.meta.env.VITE_BASE_URL;

interface MedicineListType {
  medicines: any;
}

const initialMedicineList: MedicineListType = {
  medicines: [],
};

export const fetchMedicines = createAsyncThunk<any>(
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
    deleteMedicine: (state: any, action: any) => {
      state.medicines = state.medicines.filter(
        (medicine: any) => medicine._id !== action.payload.medicineId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchMedicines.fulfilled,
      (state: MedicineListType, action) => {
        console.log(action.payload);
        state.medicines = action.payload;
      }
    );
  },
});

export const { deleteMedicine } = medicineSlice.actions;
export default medicineSlice.reducer;
