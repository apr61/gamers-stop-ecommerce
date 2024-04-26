import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import themeSlice from "../features/theme/themeSlice";
import addressSlice from "../features/address/addressSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        theme: themeSlice,
        address: addressSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch