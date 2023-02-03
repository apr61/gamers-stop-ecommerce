import { filterInitialState } from "./FilterSortContext"

export function CartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, qty: 1 }],
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(c => c.id !== action.payload.id),
            }
        case 'QUANTITY_INCREMENTOR':
            return {
                ...state,
                cart: state.cart.filter(c => c.id === action.payload.id ? c.qty = action.payload.quantity + 1 : c.qty),
            }
        case 'QUANTITY_DECREMENTOR':
            return {
                ...state,
                cart: state.cart.filter(c => c.id === action.payload.id ? c.qty = action.payload.quantity - 1 : c.qty),
            }
        default:
            return state
    }
}


export function FilterReducer(state, action) {
    const { brands, filtered_products, all_products } = { ...state }
    switch (action.type) {
        case 'LOAD_FILTERED_DATA':
            return {
                ...state,
                filtered_products: [...action.payload],
                all_products: [...action.payload]
            }
        case 'OUT_OF_STOCK':
            return {
                ...state, outOfStock: !action.payload,
                filtered_products: all_products.filter(product => action.payload ? product.quantity > 0 : product)
            }
        case 'BRANDS':
            const filteredBrands = brands.indexOf(action.payload) === -1 ? [...brands, action.payload] : brands.filter(brand => brand !== action.payload)
            return {
                ...state, brands: filteredBrands,
                filtered_products: all_products.filter(product => filteredBrands.length > 0 ? filteredBrands.indexOf(product.brand) !== -1 : product)
            }
        case 'RATING':
            return {
                ...state, rating: action.payload,
                filtered_products: filtered_products.filter(product => product.avgrating >= action.payload)
            }
        case 'ITEM_CONDITION':
            return {
                ...state, itemCondition: action.payload,
                filtered_products: filtered_products.filter(product => product.itemcondition === action.payload)
            }
        case 'PRICE':
            return {
                ...state, price: action.payload,
                filtered_products: all_products.filter(prod => prod.price<=action.payload)
            }
        case 'CLEAR_FILTERS':
            return {
                filterInitialState
            }
        case 'CATEGORY':
            return {
                ...state,
                filtered_products: filtered_products.filter(product => product.category === action.payload)
            }
        case 'SORTING':
            let newSortedData;
            let tempData = [...filtered_products]
            newSortedData = tempData.sort((a,b) => {
                if(action.payload === 'p_l-h'){
                    return a.price - b.price
                }
                if(action.payload === 'p_h-l'){
                    return b.price - a.price
                }
                if(action.payload === 'a-z'){
                    return a.name.localeCompare(b.name)
                }
                if(action.payload === 'z-a'){
                    return b.name.localeCompare (a.name)
                }
            })
            return {
                ...state,sorting_value: action.payload, filtered_products: newSortedData
            }
        default:
            return state
    }
}