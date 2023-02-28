import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { FilterReducer } from './Reducers'
import {useProductContext} from './ProductContext'

const FilterSort = createContext()

export function useFilterSortContext(){
    return useContext(FilterSort)
}

export const filterInitialState = {
    filtered_products: [],
    all_products: [],
    outOfStock: false,
    brands: [],
    rating: 0,
    itemCondition: undefined,
    price: 0,
    sorting_value: 'p_l-h',
    activeFilters: []
}


function FilterSortProvider({ children }) {

    const {products} = useProductContext()

    const [filterState, filterDispatch] = useReducer(FilterReducer, filterInitialState)

    function updateFilterHelper(type, payload){
        filterDispatch({type:type, payload:payload})
    }

    useEffect(() => {
        filterDispatch({type: 'LOAD_FILTERED_DATA', payload: products})
    }, [products])

    return (
        <FilterSort.Provider value={{filterState, filterDispatch, updateFilterHelper}}>
            {children}
        </FilterSort.Provider>
    )
}

export default FilterSortProvider