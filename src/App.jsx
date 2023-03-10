import { Route, Routes } from 'react-router-dom'
import './globalStyle.css'
import Home from "./pages/home/Home"
import ProductsList from "./pages/productsList/ProductsList"
import SingleProductPage from "./pages/singleProductPage/SingleProductPage"
import Cart from './pages/cart/Cart'
import SignIn from './pages/auth-pages/SignIn'
import SignUp from './pages/auth-pages/SignUp'
import ContextLayout from './routeLayouts/ContextLayout'
import AccountPage from './pages/accountPage/AccountPage'
import RequireAuth from './routeLayouts/RequireAuth'
import MainLayout from './routeLayouts/MainLayout'
import AccountProfilePage from './pages/accountProfilePage/AccountProfilePage'
import AccountAddressPage from './pages/accountAddressPage/AccountAddressPage'
import AddressFormPage from './pages/accountAddressPage/AddressFormPage'
import ProductProvider from './context/ProductContext'
import FilterSortProvider from './context/FilterSortContext'
import UserAddressProvider from './context/AddressContext'
import OrdersProvider from './context/OrderContext'
import CheckOutPage from './pages/checkout/CheckOutPage'
import OrderSuccessful from './pages/orderSuccessful/OrderSuccessful'
import AccountOrdersPage from './pages/accountOrdersPage/AccountOrdersPage'


function App() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route element={<ContextLayout provider={ProductProvider} />}>
					<Route element={<ContextLayout provider={FilterSortProvider} />}>
						<Route path='/' element={<Home />} />
						<Route path='/products' element={<ProductsList />} />
						<Route path='/c/:category' element={<ProductsList />} />
						<Route path='/:productName' element={<SingleProductPage />} />
					</Route>
				</Route>
				<Route element={<RequireAuth />}>
					<Route element={<ContextLayout provider={UserAddressProvider} />}>
						<Route element={<ContextLayout provider={OrdersProvider} />}>
							<Route path='/account'>
								<Route index element={<AccountPage />} />
								<Route path='profile' element={<AccountProfilePage />} />
								<Route path='addresses' element={<AccountAddressPage />} />
								<Route path='addresses/new' element={<AddressFormPage />} />
								<Route path='addresses/edit' element={<AddressFormPage />} />
								<Route path='orders' element={<AccountOrdersPage />} />
							</Route>
						</Route>
					</Route>
				</Route>
			</Route>
			<Route element={<RequireAuth />}>
				<Route element={<ContextLayout provider={UserAddressProvider} />}>
					<Route path='/checkout' element={<CheckOutPage />} />
				</Route>
				<Route path='/order-successful/:id' element={<OrderSuccessful />} />
			</Route>
			<Route path='/cart' element={<Cart />} />
			<Route path='/signin' element={<SignIn />} />
			<Route path='/signup' element={<SignUp />} />
		</Routes>
	)
}

export default App
