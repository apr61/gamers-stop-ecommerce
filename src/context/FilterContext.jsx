import React, { createContext, useContext, useReducer } from 'react'
import { FilterReducer } from './Reducers'

const Filter = createContext()

export function useFilterContext(){
    return useContext(Filter)
}

export const filterInitialState = {
    outOfStock: false,
    brands: [],
    rating: 0,
    itemCondition: undefined
}

function FilterContext({ children }) {

    const [filterState, filterDispatch] = useReducer(FilterReducer, filterInitialState)
    return (
        <Filter.Provider value={{filterState, filterDispatch}}>
            {children}
        </Filter.Provider>
    )
}

export default FilterContext