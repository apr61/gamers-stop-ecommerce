import React, { useState } from 'react'
import './checkout.css'
import Accordion from '../../components/accordion/Accordion'
import { useAddressContext } from '../../context/AddressContext'
import { Link, useNavigate } from 'react-router-dom'
import { useCartState } from '../../context/CartContext'
import CartItem from '../../components/cartItem/CartItem'
import { currencyFormatter, dateFormatter, deliveryDateSetter } from '../../utils/utils'
import { serverTimestamp } from 'firebase/firestore'
import { useAuthContext } from '../../context/AuthContext'
import { createAnOrder } from '../../services/orders'
const deliveryFee = 50
const deliveryDays = 7

function CheckOutPage() {
	const { loading, localAddresses: addresses } = useAddressContext()
	const [checkoutAddress, setCheckoutAddress] = useState()
	const [checkoutPaymethod, setCheckoutPaymethod] = useState()
	const [deliveryDate, setDeliveryDate] = useState('')
	const { cartState: { cart }, getTotalPrice, getTotalItems } = useCartState()
	const {currentUser} = useAuthContext() 
	const navigate = useNavigate()

	const conditionForDisabledPlaceOrder = checkoutAddress == undefined || checkoutPaymethod == undefined || cart.length === 0
	const deliveryDateFormatted = dateFormatter(deliveryDateSetter(deliveryDays)).split(',').join(' ')

	function handlePlaceOrder() {
		const newOrder = {
			shippingAddress: checkoutAddress,
			paymentMethod: checkoutPaymethod,
			paymentStatus: 'Not Paid',
			orderStatus: 'yet tobe shipped',
			orderedDate: serverTimestamp(),
			deliveryDate: deliveryDate,
			productsOrdered: cart,
			totalAmount: getTotalPrice(),
			totalItemsOrdered: getTotalItems(),
			deliveryFee: deliveryFee,
			uid: currentUser.uid
		}

		createAnOrder(newOrder).then((docRef) => {
			console.log(docRef.id)
			navigate(`/order-successful/${docRef.id}`, {state: {orderId : docRef.id, order: newOrder}})
		})
	}
	return (
		<>
			<header className='checkout__header'>
				<h3 className="checkout__title">Check Out</h3>
			</header>
			<section className="checkout__body main">
				<Accordion title={checkoutAddress ? '1 - Delivery address' : '1 - Select a delivery address'} modifiedStyles={'checkout__acc-title'} defaultOpen={true}>
					<div className="checkout__section">
						{
							loading ? <h2>Loading...</h2> : addresses.length < 0 ? (
								<>
									<p>No Addressed Found</p>
									<Link to='/account/addresses/new/' target='_blank' className='checkout__link'>Create a new shiping address here</Link>
								</>
							) : (
								<div className="checkout__section-output">
									{
										checkoutAddress ? (
											<>
												<div className="checkout__address-card">
													<h4 className="checkout__address-card checkout__address-card--heading">{checkoutAddress.fullName}</h4>
													<p className="checkout__address-card">{checkoutAddress.flat}</p>
													<p className="checkout__address-card">{checkoutAddress.area}</p>
													<p className="checkout__address-card">{checkoutAddress.landmark}</p>
													<p className="checkout__address-card">{checkoutAddress.town}, {checkoutAddress.state.toUpperCase()} {checkoutAddress.pincode}</p>
													<p className="checkout__address-card">India</p>
													<p className="checkout__address-card">Phone Number : {checkoutAddress.phoneNumber}</p>
												</div>
												<button className="checkout__btn checkout__btn--action" onClick={() => setCheckoutAddress()}>Change</button>
											</>
										) : (
											<>
												<div className='checkout__section-input'>
													<h4 className="checkout__subtitle">Your Addresses</h4>
													{
														addresses.map(address => (
															<div className="input-radio" key={address.id}>
																<input type="radio" className='input-radio__radio' required name="address" value={address}
																	onChange={() => setCheckoutAddress({ ...address })} id={address.id} />
																<label className='input-radio__label' htmlFor={address.id}>
																	<span className="checkout__name">{address.fullName}</span> {address.flat}, {address.area}, {address.town.toUpperCase()}, {address.state.toUpperCase()}, {address.pincode}, India, Phone Number: {address.phoneNumber}
																</label>
															</div>
														))
													}
												</div>
											</>
										)
									}
								</div>
							)
						}

					</div>
				</Accordion>
				<Accordion title={'2 - Schedule Your Delivery'} modifiedStyles={'checkout__acc-title'} defaultOpen={true}>
					<div className="checkout__section">
						<div className="checkout__section-input">
							{
								deliveryDate ? (
									<p className="checkout__selected">{deliveryDate}</p>
								) : (
									<>
										<h4 className="checkout__subtitle">Choose Delivery Date</h4>
										<div className="input-radio">
											<input type="radio" className='input-radio__radio' required name="delivery-date" id='delivery-date'
												value={deliveryDateFormatted} onChange={(e) => setDeliveryDate(e.target.value)} />
											<label className='input-radio__label' htmlFor='delivery-date'>
												{deliveryDateFormatted}
											</label>
										</div>
									</>
								)
							}
						</div>
					</div>
				</Accordion>
				<Accordion title={checkoutPaymethod ? '3 - Payment Method' : '2 - Select a payment method'} modifiedStyles={'checkout__acc-title'} defaultOpen={true}>
					<div className="checkout__section">
						{
							checkoutPaymethod ? (
								<div className='checkout__section-output'>
									<p className='checkout__selected'>{checkoutPaymethod}</p>
									<button className="checkout__btn checkout__btn--action" onClick={() => setCheckoutPaymethod()}>Change</button>
								</div>
							) : (
								<div className="checkout__section-input">
									<div className="input-radio">
										<input type="radio" className='input-radio__radio' required name="paymthod" id='cod' value='Cash On Delivery' onChange={(e) => setCheckoutPaymethod(e.target.value)} />
										<label className='input-radio__label' htmlFor='cod'>
											Cash On Delivery/ Pay on Delivery
										</label>
									</div>
								</div>
							)
						}
					</div>
				</Accordion>
				<Accordion title={'4 - Review Items And Delivery'} modifiedStyles={'checkout__acc-title'} defaultOpen={true}>
					<div className="checkout__section">
						<h4 className="checkout__subtitle">Items to be delivered</h4>
						<div className="checkout__section-input">
							{
								cart.map(product => (
									<CartItem product={product} key={product.id} />
								))
							}
						</div>
					</div>
				</Accordion>
				<div className="checkout__order-summary">
					<button className={conditionForDisabledPlaceOrder ? "checkout__btn checkout__btn--disabled" : "checkout__btn"}
						disabled={conditionForDisabledPlaceOrder} onClick={handlePlaceOrder}>Place Order And Pay</button>
					<div className="checkout__order-details">
						<h4 className="checkout__subtitle">Order Summary</h4>
						<table className='checkout__table'>
							<tbody className='checkout__tbody'>
								<tr className="checkout__tr">
									<td className="checkout__td">Items:</td>
									<td className="checkout__td checkout__td--end">{getTotalItems()}</td>
								</tr>
								<tr className="checkout__tr">
									<td className="checkout__td">Total: </td>
									<td className="checkout__td checkout__td--end">{currencyFormatter(getTotalPrice())}</td>
								</tr>
								<tr className="checkout__tr">
									<td className="checkout__td">Delivery fee:</td>
									<td className="checkout__td checkout__td--end">{currencyFormatter(deliveryFee)}</td>
								</tr>
							</tbody>
						</table>
						<p className="checkout__order-total">Order Total: {currencyFormatter(getTotalPrice() + deliveryFee)}</p>
					</div>
				</div>
			</section >
		</>
	)
}

export default CheckOutPage