import {Route, Routes} from 'react-router-dom'
import './globalStyle.css'
import Home from "./pages/home/Home"
import ProductsList from "./pages/productsList/ProductsList"
import SingleProductPage from "./pages/singleProductPage/SingleProductPage"
import Cart from './pages/cart/Cart'

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<ProductsList />} />
          <Route path='/:productName' element={<SingleProductPage />} />
          <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
