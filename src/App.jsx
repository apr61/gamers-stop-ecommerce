import {Route, Routes} from 'react-router-dom'
import './globalStyle.css'
import Home from "./pages/home/Home"
import ProductsList from "./pages/productsList/ProductsList"
import SingleProductPage from "./pages/singleProductPage/SingleProductPage"
import Cart from './pages/cart/Cart'
import SignIn from './pages/auth-pages/SignIn'
import SignUp from './pages/auth-pages/SignUp'

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<ProductsList />} />
          <Route path='/c/:category' element={<ProductsList />} />
          <Route path='/:productName' element={<SingleProductPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
