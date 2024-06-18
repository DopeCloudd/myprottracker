import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CategoryState = {
  categoryId: number | null;
};

const initialState: CategoryState = {
  categoryId: null,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
  },
});

export const { setCategoryId } = categorySlice.actions;
export default categorySlice.reducer;
