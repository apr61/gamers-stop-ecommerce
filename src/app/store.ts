import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import themeSlice from "../features/theme/themeSlice";
import addressSlice from "../features/address/addressSlice";
import authSlice from "../features/auth/authSlice";
import orderSlice from "../features/orders/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    theme: themeSlice,
    address: addressSlice,
    auth: authSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
