import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  fetchedCountries: [],
  error: "",
};

// Generating action types using Thunk

export const getCountries = createAsyncThunk("country/getCountries", async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
  }
);

// Dashboard Data Slicing

const countrySlice = createSlice({
  name: "country",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.fetchedCountries = action.payload;
      state.error = "";
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.loading = false;
      state.fetchedCountries = [];
      state.error = action.error.message;
    });
  },
});

export default countrySlice.reducer;
