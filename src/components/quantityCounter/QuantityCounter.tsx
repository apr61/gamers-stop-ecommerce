import React, { useEffect, useState } from 'react'
import { useCartState } from '../../context/CartContext'
import './quantityCounter.css'

function QuantityCounter({ product }) {
    const { cartState: { cart }, cartDispatch } = useCartState()
    const productExistsInCart = cart.filter(c => c.id === product.id)[0]

    const quantityDecrementor = () => {
        if (productExistsInCart?.qty > 1) {
            cartDispatch({
                type: 'QUANTITY_DECREMENTOR',
                payload: {
                    id: product.id,
                    quantity: productExistsInCart.qty
                }
            })
        }
    }
    const quantityIncrementor = () => {
        if(!productExistsInCart?.id){
            cartDispatch({
                type: 'ADD_TO_CART',
                payload: product
            })
            return
        }
        if (productExistsInCart?.qty <= product.quantity) {
            cartDispatch({
                type: 'QUANTITY_INCREMENTOR',
                payload: {
                    id: product.id,
                    quantity: productExistsInCart.qty
                }
            })
        }
    }
    return (
        <div className="quantity-counter">
            <button className='quantity-counter__button' onClick={quantityDecrementor}>-</button>
            <span>{productExistsInCart?.qty ?? 1}</span>
            <button className='quantity-counter__button' onClick={quantityIncrementor}>+</button>
        </div>
    )
}

export default QuantityCounter