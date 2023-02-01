import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import CartContext from './context/CartContext'
import FilterContext from './context/FilterContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartContext>
      <FilterContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FilterContext>
    </CartContext>
  </React.StrictMode>,
)
