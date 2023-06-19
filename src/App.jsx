import {lazy, Suspense} from "react"
import { Route, Routes } from "react-router-dom";

import "./index.css";
import RequireAuth from "./routeLayouts/RequireAuth";
import MainLayout from "./routeLayouts/MainLayout";
import ProductProvider from "./context/ProductContext";
import UserAddressProvider from "./context/AddressContext";
import OrdersProvider from "./context/OrderContext";
import ContextLayout from "./routeLayouts/ContextLayout";
import Loader from "./components/loader/Loader";


const Home = lazy(() => import('./pages/home/Home'))
const SingleOrderPage = lazy(() => import("./pages/singleOrderPage/SingleOrderPage"))
const AddressForm = lazy(() => import("./components/accountAddress/AddressForm"))
const AccountAddress = lazy(() => import("./components/accountAddress/AccountAddress"))
const AccountProfile = lazy(() => import("./components/accountProfile/AccountProfile"))
const AccountOrders = lazy(() => import("./components/accountOrders/AccountOrders"))
const OrderSuccessful = lazy(() => import("./pages/orderSuccessful/OrderSuccessful"))
const CheckOutPage = lazy(() => import("./pages/checkout/CheckOutPage"))
const AccountPage = lazy(() => import("./pages/accountPage/AccountPage"))
const SignUp = lazy(() => import("./components/auth/SignUp"))
const SignIn = lazy(() => import("./components/auth/SignIn"))
const Cart = lazy(() => import("./pages/cart/Cart"))
const SingleProductPage = lazy(() => import("./pages/singleProductPage/SingleProductPage"))
const ProductsList = lazy(() => import('./pages/productsList/ProductsList'))
const PageNotFound = lazy(() => import("./pages/pageNotFound/PageNotFound"))

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<ContextLayout provider={ProductProvider} />}>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<ProductsList />} />
            <Route path="/:productName" element={<SingleProductPage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route element={<ContextLayout provider={UserAddressProvider} />}>
              <Route element={<ContextLayout provider={OrdersProvider} />}>
                <Route path="/account">
                  <Route index element={<AccountPage />} />
                  <Route path="profile" element={<AccountProfile />} />
                  <Route path="addresses" element={<AccountAddress />} />
                  <Route path="addresses/new" element={<AddressForm />} />
                  <Route path="addresses/edit" element={<AddressForm />} />
                  <Route path="orders" element={<AccountOrders />} />
                  <Route path="orders/:orderId" element={<SingleOrderPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<ContextLayout provider={UserAddressProvider} />}>
            <Route path="/checkout" element={<CheckOutPage />} />
          </Route>
          <Route path="/order-successful/:id" element={<OrderSuccessful />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
