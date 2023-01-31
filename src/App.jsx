import {Route, Routes} from 'react-router-dom'
import './globalStyle.css'
import Home from "./pages/home/Home"
import CategoryList from "./pages/categorylist/CategoryList"
import ProductPage from "./pages/productPage/ProductPage"
import Cart from './pages/cart/Cart'

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/:category' element={<CategoryList />} />
          <Route path='/:category/pr/:productName' element={<ProductPage />} />
          <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
