import { Product } from "@/domain/entities/product.type";
import fetchClient from "@/infrastructure/api/fetch.instance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ProductsState = {
  productsByCategory: Record<string, Product[]>;
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  productsByCategory: {},
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>("products/fetchProducts", async (categoryId, { rejectWithValue }) => {
  try {
    const response = await fetchClient({
      method: "GET",
      endpoint: `/products/${categoryId}`,
    });
    if (!response.ok) throw new Error("Failed to fetch products");
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const categoryId = action.meta.arg;
        state.productsByCategory[categoryId] = action.payload;
        state.loading = false;
      })
      .addCase(
        fetchProducts.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Failed to fetch products";
        }
      );
  },
});

export default productsSlice.reducer;
