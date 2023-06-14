import './cartButtons.css'
import { useCartState } from '../../context/CartContext'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'


function CartButtons({ product, id }) {
    const { cartState: { cart }, cartDispatch } = useCartState()
    function handleRemoveFromCart() {
        cartDispatch({
            type: 'REMOVE_FROM_CART',
            payload: product
        })
    }
    function handleAddToCart() {
        cartDispatch({
            type: 'ADD_TO_CART',
            payload: product
        })
    }
    return (
        <>
            {
                cart.some((p) => p.id === id) ? (
                    <button
                        className="cart-btn cart-btn--remove"
                        onClick={handleRemoveFromCart}
                    ><BsTrash /> Remove From Cart</button>
                ) : (
                    <button
                        className={product.quantity > 0 ? 'cart-btn' : 'cart-btn cart-btn--out-of-stock'}
                        onClick={handleAddToCart}
                        disabled={product.quantity > 0 ? false : true}
                    >{product.quantity > 0 ? <><AiOutlineShoppingCart /> Add To Cart</> : 'Out Of Stock'}</button>
                )
            }
        </>
    )
}

export default CartButtons