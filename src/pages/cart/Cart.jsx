import { useEffect, useState } from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import CartItem from '../../components/cartItem/CartItem'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import { useCartState } from '../../context/CartContext'
import { currencyFormatter } from '../../utils/utils'
import './cart.css'

function Cart() {
    const { cartState: { cart }, getTotalItems, getTotalPrice } = useCartState()
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <div className="cart main">
                {cart.length > 0 ? (
                    <>
                        <div className="cart__container">
                            <h3 className="cart__title">Cart</h3>
                            <ul className="cart__content">
                                {cart.map(product => (
                                    <CartItem product={product} key={product.id}/>
                                ))}
                            </ul>
                        </div>
                        <div className="cart__summary">
                            <h3 className="cart__title">Sub Total of ({getTotalItems()}) items</h3>
                            <div className="cart__content">
                                <p className="cart__total-amount">{currencyFormatter(getTotalPrice())}</p>
                                <button className="cart__checkout-btn" onClick={() => navigate('/checkout')}>Check Out</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="cart__content cart__content--cart-empty">
                        <h3 className='cart__title cart__title-empty'>Your cart is empty</h3>
                        <button className="cart__checkout-btn"><Link className='cart__link' to='/'>Shop Now</Link></button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Cart