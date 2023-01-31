import React, { useState } from 'react'
import { useCartState } from '../../context/CartContext'
import './quantityCounter.css'

function QuantityCounter({product}) {
	const [quantity, setQuantity] = useState(1)
    const {cartState:{cart},cartDispatch} = useCartState()

    const quantityDecrementor = () => { 
        if(quantity>1){
            setQuantity(quantity - 1) 
            cartDispatch({
                type: 'QUANTITY_DECREMENTOR',
                payload: {
                    id: product.id,
                }
            })
        }
    }
    const quantityIncrementor = () => { 
        if(quantity <= product.quantity){
            setQuantity(quantity + 1) 
            cartDispatch({
                type: 'QUANTITY_INCREMENTOR',
                payload: {
                    id: product.id,
                }
            })
        }
    }
    return (
        <div className="quantity-counter">
            <button className='quantity-counter__button' onClick={quantityDecrementor}>-</button>
            <span>{quantity}</span>
            <button className='quantity-counter__button' onClick={quantityIncrementor}>+</button>
        </div>
    )
}

export default QuantityCounter