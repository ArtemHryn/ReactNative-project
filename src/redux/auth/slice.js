import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, checkaAuthState } from "./operations";

const initialState = {
  userId: null,
  nickname: null,
  avatar: null,
  email: null,
  error: null,
  stateChange: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.userId = action.payload.uid;
        state.nickname = action.payload.displayName;
        state.email = action.payload.email;
        state.stateChange = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userId = action.payload.uid;
        state.nickname = action.payload.displayName;
        state.email = action.payload.email;
        state.stateChange = true;
      })
      .addCase(checkaAuthState.fulfilled, (state, action) => {
        state.userId = action.payload.uid;
        state.nickname = action.payload.displayName;
        state.email = action.payload.email;
        state.stateChange = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userId = null;
        state.nickname = null;
        state.stateChange = false;
      })
      .addCase(checkaAuthState.rejected, (state, action) => {
        state.userId = null;
        state.nickname = null;
        state.stateChange = false;
        state.error = action.payload.error.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.userId = null;
        state.nickname = null;
        state.stateChange = false;
        state.error = action.payload.error.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.userId = null;
        state.nickname = null;
        state.stateChange = false;
        state.error = action.payload.error.message;
      });
  },
});

export const authReducer = authSlice.reducer;
