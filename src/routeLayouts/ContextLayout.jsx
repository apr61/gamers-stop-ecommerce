import React from 'react'
import { Outlet } from 'react-router-dom'
import FilterSortProvider from '../context/FilterSortContext'
import ProductProvider from '../context/ProductContext'

function ContextLayout() {
  return (
    <>
        <ProductProvider>
            <FilterSortProvider>
                <Outlet />
            </FilterSortProvider>
        </ProductProvider>
    </>
  )
}

export default ContextLayout