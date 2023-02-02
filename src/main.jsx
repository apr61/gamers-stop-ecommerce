import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import CartContext from './context/CartContext'
import FilterSortProvider from './context/FilterSortContext'
import ProductProvider from './context/ProductContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider>
      <FilterSortProvider>
        <CartContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartContext>
      </FilterSortProvider>
    </ProductProvider>
  </React.StrictMode>,
)
