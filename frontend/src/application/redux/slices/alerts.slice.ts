import { RootState } from "@/application/redux/store";
import { Product } from "@/domain/entities/product.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertsState {
  products: Product[];
}

const initialState: AlertsState = {
  products: [],
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setAlerts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addAlert, removeAlert, setAlerts } = alertsSlice.actions;

export const selectAlerts = (state: RootState) => state.alerts.products;

export default alertsSlice.reducer;
