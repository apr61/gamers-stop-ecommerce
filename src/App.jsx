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


function App() {
	return (
		<>
			<Routes>
				<Route element={<ContextLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/products' element={<ProductsList />} />
					<Route path='/c/:category' element={<ProductsList />} />
					<Route path='/:productName' element={<SingleProductPage />} />
				</Route>
				<Route path='/account'>
					<Route index element={<AccountPage />} />
					<Route path='profile' element={<AccountPage />} />
					<Route path='addresses' element={<AccountPage />} />
					<Route path='orders' element={<AccountPage />} />
					<Route path='paymentMethods' element={<AccountPage />} />
				</Route>

				<Route path='/cart' element={<Cart />} />
				<Route path='/signin' element={<SignIn />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
		</>
	)
}

export default App
