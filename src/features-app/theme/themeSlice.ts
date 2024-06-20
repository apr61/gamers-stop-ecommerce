import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

type ThemeStateType = {
  theme: "dark" | "light";
  isSideNavOpen: boolean;
  isSearchBarOpen: boolean;
};

const initialState: ThemeStateType = {
  theme:
    (localStorage.getItem("gamers-stop-theme") as "dark" | "light") || "dark",
  isSideNavOpen: false,
  isSearchBarOpen: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload;
    },
    openSideNav: (state) => {
      state.isSideNavOpen = true;
    },
    closeSideNav: (state) => {
      state.isSideNavOpen = false;
    },
    openSearchBar: (state) => {
      state.isSearchBarOpen = true;
    },
    closeSearchBar: (state) => {
      state.isSearchBarOpen = false;
    },
  },
});

export const getTheme = (state: RootState) => state.theme.theme;
export const selectSideNavOpen = (state: RootState) =>
  state.theme.isSideNavOpen;
export const selectSearchBarOpen = (state: RootState) =>
  state.theme.isSearchBarOpen;

export const {
  toggleTheme,
  openSideNav,
  closeSideNav,
  openSearchBar,
  closeSearchBar,
} = themeSlice.actions;

export default themeSlice.reducer;