import { createContext, useContext, useReducer } from 'react'
import { CartReducer } from './Reducers'

const Cart = createContext()

export function useCartState() {
    return useContext(Cart)
}

function CartContext({children}) {
    const [cartState, cartDispatch] = useReducer(CartReducer, {
        cart: []
    })

    return (
        <Cart.Provider value={{cartState, cartDispatch}}>
            {children}
        </Cart.Provider>
    )
}

export default CartContext