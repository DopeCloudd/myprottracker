import { Status } from "@/domain/entities/status.type";
import { User } from "@/domain/entities/user.type";
import fetchClient from "@/infrastructure/api/fetch.instance";
import { RootState } from "@/infrastructure/store/store";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type UserState = {
  user: User | null;
  status: Status;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  status: Status.IDLE,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.status = Status.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = Status.FULFILLED;
      })
      .addCase(
        fetchUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = Status.REJECTED;
          state.error = action.payload ?? "Failed to fetch user data";
        }
      );
  },
});

export const fetchUser = createAsyncThunk<
  User,
  void,
  { state: RootState; rejectValue: string }
>("user/fetchUser", async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.token;
  if (!token) return rejectWithValue("No token found");
  try {
    const response = await fetchClient<User>({
      method: "GET",
      endpoint: `/user`,
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

export default userSlice.reducer;
