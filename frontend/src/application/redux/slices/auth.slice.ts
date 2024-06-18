import { RootState } from "@/application/redux/store";
import { Status } from "@/domain/entities/status.type";
import {
  LoginUser,
  LoginUserResponse,
  RegisterUser,
  RegisterUserResponse,
  User,
} from "@/domain/entities/user.type";
import fetchClient from "@/infrastructure/api/fetch.instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: Status;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: Status.IDLE,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = Status.IDLE;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = Status.LOADING;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = Status.REJECTED;
        state.error = action.payload || "Failed to login";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.isAuthenticated = true;
        state.loading = Status.FULFILLED;
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
    builder
      .addCase(refreshToken.pending, (state) => {
        state.loading = Status.LOADING;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = Status.REJECTED;
        state.error = action.payload || "Failed to register";
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.isAuthenticated = true;
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

export const refreshToken = createAsyncThunk<
  LoginUserResponse,
  string,
  { rejectValue: string }
>("auth/refreshToken", async (token, { rejectWithValue }) => {
  try {
    const response = await fetchClient<LoginUserResponse>({
      method: "GET",
      endpoint: "/auth/refresh",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
