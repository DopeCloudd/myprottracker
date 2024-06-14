import { Status } from "@/domain/entities/status.type";
import {
  LoginUser,
  LoginUserResponse,
  RegisterUser,
  RegisterUserResponse,
} from "@/domain/entities/user.type";
import fetchClient from "@/infrastructure/api/fetch.instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  loading: Status;
  error: string | null;
};

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: Status.IDLE,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = Status.LOADING;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.isAuthenticated = true;
        state.loading = Status.FULFILLED;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = Status.REJECTED;
        state.error = action.payload || "Failed to login";
      });
    builder
      .addCase(register.pending, (state) => {
        state.loading = Status.LOADING;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = Status.REJECTED;
        state.error = action.payload || "Failed to register";
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = Status.FULFILLED;
      });
  },
});

export const login = createAsyncThunk<
  LoginUserResponse,
  LoginUser,
  { rejectValue: string }
>("login", async (data, { rejectWithValue }) => {
  try {
    const response = await fetchClient<LoginUserResponse>({
      body: data,
      method: "POST",
      endpoint: "/auth/login",
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const register = createAsyncThunk<
  RegisterUserResponse,
  RegisterUser,
  { rejectValue: string }
>("register", async (data, { rejectWithValue }) => {
  try {
    const response = await fetchClient<RegisterUserResponse>({
      body: data,
      method: "POST",
      endpoint: "/auth/register",
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export default authSlice.reducer;
