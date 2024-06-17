import { Category } from "@/domain/entities/category.types";
import { Status } from "@/domain/entities/status.type";
import fetchClient from "@/infrastructure/api/fetch.instance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type CategoriesState = {
  categories: Category[];
  loading: Status;
  error: string | null;
};

const initialState: CategoriesState = {
  categories: [],
  loading: Status.IDLE,
  error: null,
};

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchClient<Category[]>({
      method: "GET",
      endpoint: "/categories",
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

const productsSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = Status.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.loading = Status.FULFILLED;
        }
      )
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = Status.REJECTED;
          state.error = action.payload ?? "Failed to fetch categories";
        }
      );
  },
});

export default productsSlice.reducer;
