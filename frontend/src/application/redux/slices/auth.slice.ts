import { RootState } from "@/application/redux/store";
import { User } from "@/domain/entities/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
      state.loading = false;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const loadingCurrentUser = (state: RootState) => state.auth.loading;
