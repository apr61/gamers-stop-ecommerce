import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { RootState } from "../../app/store";

type AuthStateType = {
  currentUser: User | null;
  status: "idle" | "loading" | "failed" | "success";
};

const initialState: AuthStateType = {
  currentUser: null,
  status: "loading",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload.status;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectAuthStatus = (state: RootState) => state.auth.status;

export const { setStatus, setUser } = authSlice.actions;

export default authSlice.reducer;
