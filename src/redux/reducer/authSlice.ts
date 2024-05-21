import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const authSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    registration: (state, action) => {
      state.data = action.payload.data;
    },
    login: (state, action) => {
      state.data = action.payload.data;
    },
    logout: (state) => {
      state.data = null;
    },
    getUser: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const { registration, login, logout, getUser } = authSlice.actions;

export default authSlice.reducer;
