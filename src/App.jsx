import {Route, Routes} from 'react-router-dom'
import Home from "./pages/home/Home"
import CategoryList from "./pages/categorylist/CategoryList"
import ProductPage from "./pages/productPage/ProductPage"
import './globalStyle.css'

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/:category' element={<CategoryList />} />
          <Route path='/:category/pr/:productName' element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App
