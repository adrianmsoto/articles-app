import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  theme: "light" | "dark";
  globalLoading: boolean;
}

const initialState: UIState = { theme: "light", globalLoading: false };

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
    },
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload;
    },
  },
});

export const { setTheme, setGlobalLoading } = slice.actions;
export default slice.reducer;
