import React, { createContext, useContext, useReducer } from 'react'
import { FilterReducer, SortReducer } from './Reducers'

const FilterSort = createContext()

export function useFilterSortContext(){
    return useContext(FilterSort)
}

export const filterInitialState = {
    outOfStock: false,
    brands: [],
    rating: 0,
    itemCondition: undefined,
    price: 0
}


function FilterSortProvider({ children }) {

    const [filterState, filterDispatch] = useReducer(FilterReducer, filterInitialState)
    return (
        <FilterSort.Provider value={{filterState, filterDispatch}}>
            {children}
        </FilterSort.Provider>
    )
}

export default FilterSortProvider