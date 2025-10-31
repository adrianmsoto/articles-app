import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article } from "../../types/article";

const saved = localStorage.getItem("favorites");
const initialState: Article[] = saved ? JSON.parse(saved) : [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Article>) => {
      const exists = state.find((a) => a.id === action.payload.id);
      let updated;
      if (exists) {
        updated = state.filter((a) => a.id !== action.payload.id);
      } else {
        updated = [...state, action.payload];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
