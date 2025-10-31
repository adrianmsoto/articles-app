import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../../features/articles/redux/favoritesSlice";
import themeSlice from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
