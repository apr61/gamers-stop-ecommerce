import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import themeSlice from "../features/theme/themeSlice";
import uiActionsSlice from "@/redux/slice/uiActionsSlice";
import addressSlice from "@/features/addresses/addressSlice";
import usersSlice from "@/features/users/usersSlice";
import categorySlice from "@/features/categories/categorySlice";
import productsSlice from "@/features/products/productSlice";
import ordersSlice from "@/features/orders/orderSlice";
import brandsSlice from "@/features/brands/brandsSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    theme: themeSlice,
    address: addressSlice,
    uiActions: uiActionsSlice,
    users: usersSlice,
    categories: categorySlice,
    products: productsSlice,
    orders: ordersSlice,
    brands: brandsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
