import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type ThemeStateType = {
  theme: "dark" | "light";
  isSideNavOpen: boolean
};

const initialState: ThemeStateType = {
  theme:
    (localStorage.getItem("gamers-stop-theme") as "dark" | "light") || "dark",
    isSideNavOpen: false
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload;
    },
    openSideNav : (state) => {
      state.isSideNavOpen = true
    },
    closeSideNav : (state) => {
      state.isSideNavOpen = false
    }
  },
});

export const getTheme = (state: RootState) => state.theme.theme;
export const selectSideNavOpen = (state : RootState) => state.theme.isSideNavOpen

export const { toggleTheme, openSideNav, closeSideNav } = themeSlice.actions;

export default themeSlice.reducer;
