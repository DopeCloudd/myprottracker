import { RootState } from "@/application/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatisticsState {
  count_products: number;
  count_categories: number;
  count_brands: number;
  count_requests: number;
  count_users: number;
}

const initialState: StatisticsState = {
  count_products: 0,
  count_categories: 0,
  count_brands: 0,
  count_requests: 0,
  count_users: 0,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setStatistics(state, action: PayloadAction<StatisticsState>) {
      state.count_products = action.payload.count_products;
      state.count_categories = action.payload.count_categories;
      state.count_brands = action.payload.count_brands;
      state.count_requests = action.payload.count_requests;
      state.count_users = action.payload.count_users;
    },
  },
});

export const { setStatistics } = statisticsSlice.actions;

export const stats_products = (state: RootState) =>
  state.statistics.count_products;
export const stats_categories = (state: RootState) =>
  state.statistics.count_categories;
export const stats_brands = (state: RootState) => state.statistics.count_brands;
export const stats_requests = (state: RootState) =>
  state.statistics.count_requests;
export const stats_users = (state: RootState) => state.statistics.count_users;

export default statisticsSlice.reducer;
