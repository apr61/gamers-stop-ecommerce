import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

type uiActions = {
  drawer: boolean;
  deleteModal: boolean;
  sideNavOpen: boolean;
  userSideNav: boolean;
};

const initialState: uiActions = {
  drawer: false,
  deleteModal: false,
  sideNavOpen: true,
  userSideNav: false,
};

const uiActions = createSlice({
  name: "uiActions",
  initialState: initialState,
  reducers: {
    openDrawer: (state) => {
      state.drawer = true;
    },
    closeDrawer: (state) => {
      state.drawer = false;
    },
    openDeleteModal: (state) => {
      state.deleteModal = true;
    },
    closeDeleteModal: (state) => {
      state.deleteModal = false;
    },
    setSideNav: (state, action) => {
      state.sideNavOpen = action.payload;
    },
    resetUiState: (state) => {
      (state.drawer = false), (state.deleteModal = false);
    },
    setUserSideNav: (state, action) => {
      state.userSideNav = action.payload;
    },
  },
});

export const selectDrawer = (state: RootState) => state.uiActions.drawer;
export const selectSideNav = (state: RootState) => state.uiActions.sideNavOpen;
export const selectDeleteModal = (state: RootState) =>
  state.uiActions.deleteModal;
export const selectUserSideNav = (state: RootState) =>
  state.uiActions.userSideNav;

export const {
  openDrawer,
  closeDeleteModal,
  closeDrawer,
  openDeleteModal,
  resetUiState,
  setSideNav,
  setUserSideNav,
} = uiActions.actions;

export default uiActions.reducer;
