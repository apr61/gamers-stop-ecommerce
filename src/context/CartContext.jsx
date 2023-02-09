import { createContext, useContext, useEffect, useReducer } from 'react'
import { CartReducer } from './Reducers'

const Cart = createContext()

export function useCartState() {
    return useContext(Cart)
}


const initialState = {
    cart: JSON.parse(localStorage.getItem('gamers-stop-cart'))?.cart || [],
}

function CartProvider({ children }) {
    const [cartState, cartDispatch] = useReducer(CartReducer, initialState)
    useEffect(() => {
        localStorage.setItem('gamers-stop-cart', JSON.stringify(cartState))
    }, [cartState.cart])
    
    function getTotalItems(){
        return cartState.cart.reduce((acc,curr) => acc+curr.qty, 0)
    }
    function getTotalPrice(){
        return cartState.cart.reduce((acc, curr) => (acc+curr.price) * curr.qty ,0)
    }
    return (
        <Cart.Provider value={{ cartState, cartDispatch, getTotalItems, getTotalPrice}}>
            {children}
        </Cart.Provider>
    )
}

export default CartProvider