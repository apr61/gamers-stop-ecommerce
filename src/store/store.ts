import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features-app/cart/cartSlice";
import themeSlice from "../features-app/theme/themeSlice";
import addressSlice from "../features-app/address/addressSlice";
import authSlice from "../features-app/auth/authSlice";
import orderSlice from "../features-app/orders/orderSlice";
import productSlice from "../features-app/products/productSlice";
import uiActionsSlice from "@/redux/slice/uiActionsSlice";
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
    auth: authSlice,
    order: orderSlice,
    product: productSlice,
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
