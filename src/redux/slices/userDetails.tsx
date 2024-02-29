import {
  Action,
  ThunkDispatch,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const postUserData = createAsyncThunk(
  "userDetails/signUpData",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://e157-116-58-9-130.ngrok-free.app/auth/signup",
        userData
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data.message);
      }
      throw error;
    }
  }
);

export const postLoginData = createAsyncThunk(
  "userDetails/postLoginData",
  async (loginData: loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://e157-116-58-9-130.ngrok-free.app/auth/signin",
        loginData
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error: any) {
      if (error.response || error.response.status === 401) {
        // Unauthorized - password doesn't match
        return rejectWithValue(error.response.data.message);
      }
      throw error;
    }
  }
);

export interface loginData {
  email: string;
  password: string;
}
export interface UserData {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
}
export interface UserDetailState {
  users: UserData[];
  loading: boolean;
  loginError: {} | string | null;
  signupError: {} | string | null;
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
        state.signupError = null;
        state.users.push(action.payload);
      })
      .addCase(postUserData.rejected, (state, action) => {
        state.loading = false;
        state.signupError = action.payload || "Unknown error";
      })
      .addCase(postLoginData.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(postLoginData.fulfilled, (state, action) => {
        state.loading = false;
        state.loginError = null;
        state.token = action.payload.token;
      })
      .addCase(postLoginData.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload || "Unknown error";
        console.log(action.error.message);
      });
  },
});

export default userDetailSlice.reducer;
//export type RootState = ReturnType<typeof userDetailSlice.reducer>;
export type AppThunkDispatch = ThunkDispatch<UserDetailState, any, Action>;
