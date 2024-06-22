import { RootState } from "@/application/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  products: string[];
}

const initialState: FavoritesState = {
  products: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.products.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((id) => id !== action.payload);
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.products;

export default favoritesSlice.reducer;
