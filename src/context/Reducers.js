export function CartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(c => c.id !== action.payload.id) }
        case 'QUANTITY_INCREMENTOR':
            return { ...state, cart: state.cart.filter(c => c.id === action.payload.id? c.qty += 1: c.qty) }
        case 'QUANTITY_DECREMENTOR':
            return { ...state, cart: state.cart.filter(c => c.id === action.payload.id? c.qty -= 1: c.qty) }
        default:
            return state
    }
}