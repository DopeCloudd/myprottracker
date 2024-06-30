import { RootState } from "@/application/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type FileState = {
  file: File | null;
  preview: string | null;
};

const initialState: FileState = {
  file: null,
  preview: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFile: (
      state,
      {
        payload: { file, preview },
      }: PayloadAction<{ file: File; preview: string }>
    ) => {
      state.file = file;
      state.preview = preview;
    },
    removeFile: (state) => {
      state.file = null;
      state.preview = null;
    },
  },
});

export const { setFile, removeFile } = fileSlice.actions;
export default fileSlice.reducer;
export const selectedFile = (state: RootState) => state.file.file;
export const previewFile = (state: RootState) => state.file.preview;
