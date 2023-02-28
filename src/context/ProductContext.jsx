import React, { createContext, useContext } from 'react'
import { useAsync } from '../hooks/useAsync'
import { getProducts } from '../services/products'


const ProductContext = createContext()

export function useProductContext() {
    return useContext(ProductContext)
}

function ProductProvider({ children }) {

    const { loading, error, value: products } = useAsync(getProducts)

    return (
        <ProductContext.Provider value={{ products }}>
            {
                loading ? (<h1>Loading...</h1>) : error ? (<h1>{error}</h1>) : (children)
            }
        </ProductContext.Provider>
    )
}

export default ProductProvider