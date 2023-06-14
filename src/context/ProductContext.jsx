import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAsync } from '../hooks/useAsync'
import { getProducts } from '../services/products'


const ProductContext = createContext()

export function useProductContext() {
    return useContext(ProductContext)
}

function ProductProvider({ children }) {

    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try{
            setIsLoading(true)
            const data = await getProducts()
            setProducts(data)
        }catch(err){
            console.error(err.message)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    
    return (
        <ProductContext.Provider value={{ products, isLoading }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider