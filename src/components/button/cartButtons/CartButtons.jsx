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
                    <button className={product.quantity>0 ? 'cart-btn' : 'cart-btn cart-btn--out-of-stock'} onClick={() => {
                        cartDispatch({
                            type: 'ADD_TO_CART',
                            payload: product
                        })
                    }} disabled={product.quantity>0 ? false : true}>
                    {product.quantity > 0 ? <><AiOutlineShoppingCart /> Add To Cart</> : 'Out Of Stock'}</button>
                )
            }
        </>
    )
}

export default CartButtons