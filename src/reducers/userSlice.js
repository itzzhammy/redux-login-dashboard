import { createSlice } from "@reduxjs/toolkit";

// Dashboard Data Slicing

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { isLoading: true, error: null, isLoggedin: false, data: null },
  },
  reducers: {
    login: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logout: (state) => {
      state.user = {
        error: null,
        isLoggedin: false,
        data: null,
      };
    },
  },
});

// Exporting Reducer and User information to check logged in status

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
