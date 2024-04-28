import { Navigate, Route, Routes } from "react-router-dom";

import "./index.css";
import RequireAuth from "./layouts/RequireAuth";
import MainLayout from "./layouts/MainLayout";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./components/loader/Loader";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getTheme } from "./features/theme/themeSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { setStatus, setUser } from "./features/auth/authSlice";
import { selectCart } from "./features/cart/cartSlice";
import AccountLayout from "./layouts/accountLayout/AccountLayout";

const Home = lazy(() => import("./pages/home/Home"));
const SingleOrderPage = lazy(
  () => import("./features/orders/singleOrderPage/SingleOrderPage")
);
const AddNewAddress = lazy(
  () => import("./features/address/accountAddress/AddNewAddess")
);
const EditAddress = lazy(
  () => import("./features/address/accountAddress/EditAddress")
);
const AccountAddress = lazy(
  () => import("./features/address/accountAddress/AccountAddress")
);
const AccountProfile = lazy(
  () => import("./features/auth/accountProfile/AccountProfile")
);
const AccountOrders = lazy(
  () => import("./features/orders/accountOrders/AccountOrders")
);
const OrderSuccessful = lazy(
  () => import("./features/orders/orderSuccessful/OrderSuccessful")
);
const CheckOutPage = lazy(() => import("./pages/checkout/CheckOutPage"));
const AccountOverview = lazy(
  () => import("./pages/accountPage/AccountOverview")
);
const SignUp = lazy(() => import("./components/auth/SignUp"));
const SignIn = lazy(() => import("./components/auth/SignIn"));
const Cart = lazy(() => import("./features/cart/cart/Cart"));
const SingleProductPage = lazy(
  () => import("./features/products/singleProductPage/SingleProductPage")
);
const ProductsList = lazy(
  () => import("./features/products/productsList/ProductsList")
);
const PageNotFound = lazy(
  () => import("./components/pageNotFound/PageNotFound")
);
const AddNewProduct = lazy(
  () => import("./components/addNewProduct/AddNewProduct")
);

function App() {
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
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          <Route path="/store" element={<ProductsList />} />
          <Route path="/store/:slugurl" element={<SingleProductPage />} />
          <Route path="/store/new" element={<AddNewProduct />} />
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
  );
}

export default App;
