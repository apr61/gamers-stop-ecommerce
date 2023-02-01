import React, { useEffect, useState } from 'react'
import { useCartState } from '../../context/CartContext'
import './quantityCounter.css'

function QuantityCounter({ product }) {
    const { cartState: { cart }, cartDispatch } = useCartState()
    const productExistsInCart = cart.filter(c => c.id === product.id)[0]
    const [quantity, setQuantity] = useState(productExistsInCart?.qty || 1)

    useEffect(() => {
        (!productExistsInCart) && setQuantity(1)
    }, [cart])
    
    const quantityDecrementor = () => {
        if (quantity > 1) {
            setQuantity(oldQuantity => oldQuantity - 1)
            cartDispatch({
                type: 'QUANTITY_DECREMENTOR',
                payload: {
                    id: product.id,
                    quantity: quantity
                }
            })
        }
    }
    const quantityIncrementor = () => {
        if (quantity <= product.quantity) {
            setQuantity(oldQuantity => oldQuantity + 1)
            cartDispatch({
                type: 'QUANTITY_INCREMENTOR',
                payload: {
                    id: product.id,
                    quantity: quantity
                }
            })
        }
    }
    return (
        productExistsInCart && (
            <div className="quantity-counter">
                <button className='quantity-counter__button' onClick={quantityDecrementor}>-</button>
                <span>{quantity}</span>
                <button className='quantity-counter__button' onClick={quantityIncrementor}>+</button>
            </div>
        )
    )
}

export default QuantityCounter