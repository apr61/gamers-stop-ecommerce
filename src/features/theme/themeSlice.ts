import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type ThemeStateType = {
  theme: "dark" | "light";
};

const initialState: ThemeStateType = {
  theme:
    (localStorage.getItem("gamers-stop-theme") as "dark" | "light") || "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const getTheme = (state: RootState) => state.theme.theme;

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
