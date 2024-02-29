import { Action, ThunkDispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postUserData = createAsyncThunk(
  "userDetails/signUpData",
  async (userData:UserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://e157-116-58-9-130.ngrok-free.app/auth/signup",
        userData
      );
      return response.data;
    } catch (error: any) {
      if (error.response.data.message && error.response.status === 400) {
        throw rejectWithValue("User Already Exist : please login");
      }
      throw error;
    }
  }
);

export const postLoginData = createAsyncThunk(
  "userDetails/postLoginData",
  async (loginData:loginData , { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://e157-116-58-9-130.ngrok-free.app/auth/signin",
        loginData
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Unauthorized - password doesn't match
        return rejectWithValue("Password doesn't match");
      }
      throw error;
    }
  }
);
interface loginData {
  email: string;
  password: string;
}
interface UserData {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
}
interface UserDetailState {
  users: UserData[];
  loading: boolean;
  loginError: string | null;
  signupError: string | null;
  token: string | null;
}
const initialState: UserDetailState = {
  users: [],
  loading: false,
  signupError: null,
  loginError: null,
  token: null,
};

const userDetailSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postUserData.pending, (state) => {
        state.loading = true;
        state.signupError = null;
      })
      .addCase(postUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(postUserData.rejected, (state, action) => {
        state.loading = false;
        state.signupError = action.error.message || "Unknown error";
      })
      .addCase(postLoginData.pending, (state) => {
        state.loading = true;
        state.signupError = null;
      })
      .addCase(postLoginData.fulfilled, (state) => {
        state.loading = false;
        state.signupError = null;
      })
      .addCase(postLoginData.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.error.message || "Unknown error";
      });
  },
});

export default userDetailSlice.reducer;
export type RootState = ReturnType<typeof userDetailSlice.reducer>;
export type AppThunkDispatch = ThunkDispatch<UserDetailState, any, Action>;
