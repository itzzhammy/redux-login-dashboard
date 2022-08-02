import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  fetchedUsers: [],
  error: "",
};

// Generating action types using Thunk

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch("https://reqres.in/api/users");
  const data = await response.json();
  return data;
});

// Dashboard Data Slicing

const dashboardSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.fetchedUsers = action.payload.data;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.fetchedUsers = [];
      state.error = action.error.message;
    });
  },
});

export default dashboardSlice.reducer;
