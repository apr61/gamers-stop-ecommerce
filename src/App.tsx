import { Navigate, Route, Routes } from "react-router-dom";

import "./index.css";
import RequireAuth from "./components/layouts-app/RequireAuth";
import MainLayout from "./components/layouts-app/MainLayout";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./components/loader/Loader";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getTheme } from "./features-app/theme/themeSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { setStatus, setUser } from "./features-app/auth/authSlice";
import { selectCart } from "./features-app/cart/cartSlice";
import AccountLayout from "./components/layouts-app/AccountLayout";

const Home = lazy(() => import("./pages/home/Home"));
const SingleOrderPage = lazy(
  () => import("./features-app/orders/singleOrderPage/SingleOrderPage"),
);
const AddNewAddress = lazy(
  () => import("./features-app/address/accountAddress/AddNewAddess"),
);
const EditAddress = lazy(
  () => import("./features-app/address/accountAddress/EditAddress"),
);
const AccountAddress = lazy(
  () => import("./features-app/address/accountAddress/AccountAddress"),
);
const AccountProfile = lazy(
  () => import("./features-app/auth/accountProfile/AccountProfile"),
);
const AccountOrders = lazy(
  () => import("./features-app/orders/accountOrders/AccountOrders"),
);
const OrderSuccessful = lazy(
  () => import("./features-app/orders/orderSuccessful/OrderSuccessful"),
);
const CheckOutPage = lazy(() => import("./pages/checkout/CheckOutPage"));
const AccountOverview = lazy(
  () => import("./pages/accountPage/AccountOverview"),
);
const SignUp = lazy(() => import("./components/auth/SignUp"));
const SignIn = lazy(() => import("./components/auth/SignIn"));
const Cart = lazy(() => import("./features-app/cart/cart/Cart"));
const SingleProductPage = lazy(
  () => import("./features-app/products/singleProductPage/SingleProductPage"),
);
const ProductsList = lazy(
  () => import("./features-app/products/productsList/ProductsList"),
);
const PageNotFound = lazy(
  () => import("./components/pageNotFound/PageNotFound"),
);

function AppPrev() {
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  useEffect(() => {
    theme === "dark"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
    localStorage.setItem("gamers-stop-theme", theme);
    localStorage.setItem("gamers-stop-cart", JSON.stringify(cart));
  }, [dispatch, theme, cart]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setStatus({ status: "success" }));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<MainLayout />}>
            <Route path="/store" element={<ProductsList />} />
            <Route path="/store/:slugurl" element={<SingleProductPage />} />
            <Route element={<RequireAuth />}>
              <Route path="/account" element={<AccountLayout />}>
                <Route path="" element={<Navigate to="dashboard" replace />} />
                <Route index path="dashboard" element={<AccountOverview />} />
                <Route path="profile" element={<AccountProfile />} />
                <Route path="addresses" element={<AccountAddress />} />
                <Route path="addresses/new" element={<AddNewAddress />} />
                <Route
                  path="addresses/edit/:addressId"
                  element={<EditAddress />}
                />
                <Route path="orders" element={<AccountOrders />} />
                <Route path="orders/:orderId" element={<SingleOrderPage />} />
              </Route>
            </Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route
              path="/order-successful/:orderId"
              element={<OrderSuccessful />}
            />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default AppPrev;
