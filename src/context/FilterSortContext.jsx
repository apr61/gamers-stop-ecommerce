import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { FilterReducer } from './Reducers'
import { useProductContext } from './ProductContext'

const FilterSort = createContext()

export function useFilterSortContext() {
    return useContext(FilterSort)
}

export const filterInitialState = {
    filtered_products: [],
    all_products: [],
    filters: {
        outOfStock: false,
        brands: [],
        rating: 0,
        itemCondition: undefined,
        price: 0,
        category: 'all products'
    },
    sorting_value: 'p_l-h',
    activeFilters: [],
}


function FilterSortProvider({ children }) {

    const { productsLoading, products } = useProductContext()

    const [filterState, filterDispatch] = useReducer(FilterReducer, filterInitialState)

    function updateFilterHelper(type, payload) {
        filterDispatch({ type, payload})
    }

    useEffect(() => {
        if(productsLoading) return 
        filterDispatch({type: 'FILTER'})
        filterDispatch({type: 'SORTING'})
    }, [products, filterState.sorting_value, filterState.filters])

    useEffect(() => {
        if(productsLoading) return 
        filterDispatch({ type: 'LOAD_FILTERED_DATA', payload: products })
    }, [products])

    return (
        <FilterSort.Provider value={{ filterState, filterDispatch, updateFilterHelper, productsLoading }}>
            {children}
        </FilterSort.Provider>
    )
}

export default FilterSortProvider