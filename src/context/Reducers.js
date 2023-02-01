import { filterInitialState } from "./FilterContext"

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
    switch (action.type) {
        case 'OUT_OF_STOCK':
            return {
                ...state, outOfStock: !action.payload
            }
        case 'BRANDS':
            return {
                ...state, brands: state.brands.indexOf(action.payload) === -1 ? [...state.brands, action.payload] : state.brands.filter(brand => brand !== action.payload)
            }
        case 'RATING':
            return {
                ...state, rating: action.payload
            }
        case 'ITEM_CONDITION':
            return {
                ...state, itemCondition: action.payload
            }
        case 'CLEAR_FILTERS':
            return {
                filterInitialState
            }
        default:
            return state
    }
}