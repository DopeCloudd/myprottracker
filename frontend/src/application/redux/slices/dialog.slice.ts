import { RootState } from "@/application/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type Initial = {
  open: boolean;
};

const initialState: Initial = {
  open: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = true;
    },
    setClose: (state) => {
      state.open = false;
    },
  },
});

export const { setOpen, setClose } = dialogSlice.actions;
export default dialogSlice.reducer;
export const selectOpenDialog = (state: RootState) => state.dialog.open;
