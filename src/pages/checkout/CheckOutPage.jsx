import React, { useEffect, useState } from "react";
import "./checkout.css";
import { useAddressContext } from "../../context/AddressContext";
import { Link, useNavigate } from "react-router-dom";
import { useCartState } from "../../context/CartContext";
import { currencyFormatter } from "../../utils/utils";
import { serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";
import { createAnOrder } from "../../services/orders";

function CheckOutPage() {
  document.title = "Checkout | Gamers Stop";
  const { loading, localAddresses: addresses } = useAddressContext();
  const [checkoutAddress, setCheckoutAddress] = useState({});
  const {
    cartState: { cart },
    totalPrice,
    totalItems,
    discount,
    grandTotal,
    deliveryFee,
  } = useCartState();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  function handlePlaceOrder() {
    const newOrder = {
      shippingAddress: checkoutAddress,
      paymentStatus: "Not Paid",
      orderStatus: "yet tobe shipped",
      orderedDate: serverTimestamp(),
      productsOrdered: cart,
      totalAmount: totalPrice,
      totalItemsOrdered: totalItems,
      deliveryFee: deliveryFee,
      uid: currentUser.uid,
    };

    createAnOrder(newOrder).then((docRef) => {
      navigate(`/order-successful/${docRef.id}`, {
        state: { orderId: docRef.id, order: newOrder },
      });
    });
  }
  useEffect(() => {
    if (loading) return;
    setCheckoutAddress(addresses[0]);
  }, [addresses]);
  if (cart.length <= 0) {
    navigate("/cart");
  }
  return (
    <>
      <section className="checkout">
        <h2 className="checkout__title">Check Out</h2>
        <div className="checkout__body">
          <section className="checkout__address">
            <h3 className="checkout__title checkout__title--md">
              Select Address
            </h3>
            <div className="checkout__address-container">
              {addresses.map((address) => (
                <div className="checkout__address-card" key={address.id}>
                  <input
                    type="radio"
                    name="address"
                    checked={address.id === checkoutAddress?.id}
                    id={address.id}
                    onChange={() => setCheckoutAddress(address)}
                  />
                  <label
                    htmlFor={address.id}
                    className="checkout__address-label"
                  >
                    <h4 className="address__details address__details--heading">
                      {address.fullName}
                    </h4>
                    <p className="address__details">
                      {address.flat}, {address.area}
                    </p>
                    <p className="address__details">{address.landmark}</p>
                    <p className="address__details">
                      {address.town}, {address.state.toUpperCase()}{" "}
                      {address.pincode}
                    </p>
                    <p className="address__details">India</p>
                    <p className="address__details">
                      Phone Number : {address.phoneNumber}
                    </p>
                  </label>
                </div>
              ))}
              <Link to="/account/addresses/new" target="_blank">
                Add new address
              </Link>
            </div>
          </section>
          <div className="checkout__summary">
            <section className="checkout__sec">
              <h2 className="checkout__title checkout__title--md">
                Order Summary
              </h2>
              <table className="checkout__table">
                <tbody>
                  {cart.map((product) => (
                    <tr key={product.id} className="checkout__trow">
                      <th>
                        {product.name} ({currencyFormatter(product.price)} x{" "}
                        {product.qty})
                      </th>
                      <td>{currencyFormatter(product.price * product.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section className="checkout__sec">
              <h2 className="checkout__title checkout__title--md">
                Price Details
              </h2>
              <table className="checkout__table">
                <tbody>
                  <tr className="checkout__trow">
                    <th>Total Price</th>
                    <td>{currencyFormatter(totalPrice)}</td>
                  </tr>
                  <tr className="checkout__trow">
                    <th>Total Discount (5%)</th>
                    <td>- {currencyFormatter(discount)}</td>
                  </tr>
                  <tr className="checkout__trow">
                    <th>Delivery Fee</th>
                    <td>+ {currencyFormatter(deliveryFee)}</td>
                  </tr>
                  <tr className="checkout__trow checkout__trow--grand-total">
                    <th>Grand total</th>
                    <td>{currencyFormatter(grandTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section className="checkout__sec">
              <h2 className="checkout__title checkout__title--md">
                Deliver To
              </h2>
              <div className="checkout__selected-address">
                <h4 className="address__details address__details--heading">
                  {checkoutAddress?.fullName}
                </h4>
                <p className="address__details">
                  {checkoutAddress?.flat}, {checkoutAddress?.area}
                </p>
                <p className="address__details">{checkoutAddress?.landmark}</p>
                <p className="address__details">
                  {checkoutAddress?.town}, {checkoutAddress?.state}{" "}
                  {checkoutAddress?.pincode}
                </p>
                <p className="address__details">India</p>
                <p className="address__details">
                  Phone Number : {checkoutAddress?.phoneNumber}
                </p>
              </div>
            </section>
            <button
              className="checkout__btn"
              onClick={() => handlePlaceOrder()}
            >
              Place Order & Pay
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default CheckOutPage;
