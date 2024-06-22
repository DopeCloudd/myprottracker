import { RootState } from "@/application/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertsState {
  products: string[];
}

const initialState: AlertsState = {
  products: [],
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<string>) => {
      state.products.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((id) => id !== action.payload);
    },
    setAlerts: (state, action: PayloadAction<string[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addAlert, removeAlert, setAlerts } = alertsSlice.actions;

export const selectAlerts = (state: RootState) => state.alerts.products;

export default alertsSlice.reducer;
