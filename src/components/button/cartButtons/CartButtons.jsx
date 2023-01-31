import './cartButtons.css'
import { useCartState } from '../../../context/CartContext'
import { AiOutlineShoppingCart } from 'react-icons/ai'

function CartButtons({product, id}) {
    const { cartState: { cart }, cartDispatch } = useCartState()
    return (
        <>
            {
                cart.some((p) => p.id === id) ? (
                    <button className="cart-btn cart-btn--remove" onClick={() => {
                        cartDispatch({
                            type: 'REMOVE_FROM_CART',
                            payload: product
                        })
                    }}>Remove From Cart</button>
                ) : (
                    <button className="cart-btn" onClick={() => {
                        cartDispatch({
                            type: 'ADD_TO_CART',
                            payload: product
                        })
                    }}><><AiOutlineShoppingCart /></> Add To Cart</button>
                )
            }
        </>
    )
}

export default CartButtons