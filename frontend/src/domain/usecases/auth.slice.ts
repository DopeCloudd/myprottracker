import { Status } from "@/domain/entities/status.type";
import { NewUser, User, UserBasicInfo } from "@/domain/entities/user.type";
import fetchClient from "@/infrastructure/api/fetch.instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  loading: Status;
};

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: Status.IDLE,
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
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.loading = Status.FULFILLED;
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(login.rejected, (state) => {
        state.loading = Status.REJECTED;
      });
    builder
      .addCase(register.pending, (state) => {
        state.loading = Status.LOADING;
      })
      .addCase(register.rejected, (state) => {
        state.loading = Status.REJECTED;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = Status.FULFILLED;
      });
  },
});

type LoginResponse = {
  accessToken: string;
  user: UserBasicInfo;
};

export const login = createAsyncThunk<
  LoginResponse,
  User,
  { rejectValue: string }
>("login", async (data, { rejectWithValue }) => {
  try {
    const response = await fetchClient({
      body: data,
      method: "POST",
      endpoint: "/auth/login",
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const register = createAsyncThunk("register", async (data: NewUser) => {
  return await fetchClient({
    body: data,
    method: "POST",
    endpoint: "/auth/register",
  });
});

export const getUser = createAsyncThunk(
  "users/profile",
  async (userId: string) => {
    return await fetchClient({
      method: "GET",
      endpoint: `/users/${userId}`,
    });
  }
);

export default authSlice.reducer;
