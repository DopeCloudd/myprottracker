import { Category } from "@/domain/entities/category.types";
import fetchClient from "@/infrastructure/api/fetch.instance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type CategoriesState = {
  categories: Category[];
  loading: boolean;
  error: string | null;
};

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchClient({
      method: "GET",
      endpoint: "/categories",
    });
    if (!response.ok) throw new Error("Failed to fetch categories");
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
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Failed to fetch categories";
        }
      );
  },
});

export default productsSlice.reducer;
