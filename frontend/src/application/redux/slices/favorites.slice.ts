import { RootState } from "@/application/redux/store";
import { Product } from "@/domain/entities/product.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  products: Product[];
}

const initialState: FavoritesState = {
  products: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.products;

export default favoritesSlice.reducer;
