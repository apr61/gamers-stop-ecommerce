import React, { createContext, useContext } from 'react'
import { useAsync } from '../hooks/useAsync'
import { getProducts } from '../services/products'


const ProductContext = createContext()

export function useProductContext() {
    return useContext(ProductContext)
}

function ProductProvider({ children }) {

    const { loading: productsLoading, error, value: products } = useAsync(getProducts)
    
    return (
        <ProductContext.Provider value={{ products, productsLoading }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider