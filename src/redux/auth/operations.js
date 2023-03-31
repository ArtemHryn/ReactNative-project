import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "@firebase/auth";
import { auth } from "../../firebase/config";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, login }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      await updateProfile(user, { displayName: login });

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const signIn = await signInWithEmailAndPassword(auth, email, password);

      return signIn.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const logOut = await signOut(auth);
    return logOut;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const checkaAuthState = createAsyncThunk(
  "auth/refresh",
  async (user, thunkAPI) => {
    try {
      if (user) {
        return user;
      }
      throw new Error("Unathorized");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
