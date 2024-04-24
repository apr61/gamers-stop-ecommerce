import { useEffect, useState } from "react";
import "./checkout.css";
import { useAddressContext } from "../../context/AddressContext";
import { Link, useNavigate } from "react-router-dom";
import { useCartState } from "../../context/CartContext";
import { currencyFormatter } from "../../utils/utils";
import { useAuthContext } from "../../context/AuthContext";
import { createAnOrderService } from "../../services/orders";
import Loader from "../../components/loader/Loader";
import { Address, OrderData, RazorpayPaymentResponse, ServerTimestamp } from "../../utils/types";
import { serverTimestamp } from "firebase/firestore";

function CheckOutPage() {
  document.title = "Checkout | Gamers Stop";
  const { isLoading, addresses } = useAddressContext();
  const [checkoutAddress, setCheckoutAddress] = useState<Address | null>(null);
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
  const canPlaceOrder = checkoutAddress != null;

  const handlePaymentSuccess = async (response: RazorpayPaymentResponse) => {
    const newOrder : OrderData = {
      paymentId: response.razorpay_payment_id as string,
      shippingAddress: checkoutAddress!,
      paymentStatus: "paid",
      orderStatus: "yet-to-be-shipped",
      orderedDate: serverTimestamp() as ServerTimestamp,
      productsOrdered: [...cart],
      totalAmount: totalPrice,
      totalItemsOrdered: totalItems,
      deliveryFee: deliveryFee,
      grandTotal: grandTotal,
      uid: currentUser?.uid as string,
      discount,
    };
    const docRef = await createAnOrderService(newOrder);
    navigate(`/order-successful/${docRef.id}`, {
      state: { orderId: docRef.id, order: newOrder },
    });
  };

  const RazorpayOptions = {
    key: import.meta.env.VITE_APP_RAZORPAY_KEY_ID,
    amount: Math.floor(grandTotal) * 100,
    currency: "INR",
    name: "Gamers Stop",
    description: "Thank you for shopping with us.",
    image: "https://firebasestorage.googleapis.com/v0/b/gamers-stop-ecom-dev.appspot.com/o/favicon.ico?alt=media&token=26721467-df11-408f-bb40-31670d555e36",
    handler: (response : RazorpayPaymentResponse) => handlePaymentSuccess(response),
    prefill: {
      name: currentUser?.displayName,
      email: currentUser?.email,
      contact: checkoutAddress?.phoneNumber,
    },
    notes: {
      address: checkoutAddress,
    },
    theme: {
      color: "#3399cc",
    },
  };

  const handlePlaceOrder = () => {
    if (checkoutAddress) {
      const razorpayInstance = new (window as any).Razorpay(RazorpayOptions);
      razorpayInstance.open();
    }
  };

  useEffect(() => {
    if (isLoading) return;
    setCheckoutAddress(addresses[0]);
  }, [addresses]);

  return (
    <>
      <section className="checkout">
        <h2 className="checkout__title">Check Out</h2>
        <div className="checkout__body">
          <section className="checkout__address">
            <h3 className="checkout__title">Select Address</h3>
            {isLoading ? (
              <Loader />
            ) : (
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
                        {address.fullname}
                      </h4>
                      <p className="address__details">
                        {address.flat}, {address.area}
                      </p>
                      <p className="address__details">{address.landmark}</p>
                      <p className="address__details">
                        {address.city}, {address.state.toUpperCase()}{" "}
                        {address.pincode}
                      </p>
                      <p className="address__details">India</p>
                      <p className="address__details">
                        Phone Number : {address.phoneNumber}
                      </p>
                    </label>
                  </div>
                ))}
                <Link className="checkout__link" to="/account/addresses/new">
                  Add new address
                </Link>
              </div>
            )}
          </section>
          <div className="checkout__summary">
            <section className="checkout__sec">
              <h2 className="checkout__title checkout__title--md">
                Order Summary
              </h2>
              <div>
                {cart.map(({ id, name, images, price, qty }) => (
                  <article key={id} className="checkout__item">
                    <img
                      className="checkout__img"
                      src={images[0]}
                      alt={name}
                      loading="lazy"
                    />
                    <div>
                      <h3>{name}</h3>
                      <p>{currencyFormatter(price)}</p>
                      <p>Qty : {qty}</p>
                      <p>SUB : {currencyFormatter(qty * price)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section className="checkout__sec">
              <h2 className="checkout__title checkout__title--md">
                Price Details
              </h2>
              <table className="checkout__table">
                <tbody>
                  <tr className="checkout__trow">
                    <th className="checkout__th">Total Price</th>
                    <td>{currencyFormatter(totalPrice)}</td>
                  </tr>
                  <tr className="checkout__trow">
                    <th className="checkout__th">Total Discount (5%)</th>
                    <td>- {currencyFormatter(discount)}</td>
                  </tr>
                  <tr className="checkout__trow">
                    <th className="checkout__th">Delivery Fee</th>
                    <td>+ {currencyFormatter(deliveryFee)}</td>
                  </tr>
                  <tr className="checkout__trow checkout__trow--grand-total">
                    <th className="checkout__th checkout__th--grand-total">
                      Grand total
                    </th>
                    <td>{currencyFormatter(grandTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section className="checkout__sec">
              <h2 className="checkout__title checkout__title--md">
                Deliver To
              </h2>
              {isLoading ? (
                <Loader />
              ) : !canPlaceOrder ? (
                <div className="checkout__selected-address">
                  <p className="checkout__address-empty">No address selected</p>
                </div>
              ) : (
                <div className="checkout__selected-address">
                  <h4 className="address__details address__details--heading">
                    {checkoutAddress?.fullname}
                  </h4>
                  <p className="address__details">
                    {checkoutAddress?.flat}, {checkoutAddress?.area}
                  </p>
                  <p className="address__details">
                    {checkoutAddress?.landmark}
                  </p>
                  <p className="address__details">
                    {checkoutAddress?.city}, {checkoutAddress?.state}{" "}
                    {checkoutAddress?.pincode}
                  </p>
                  <p className="address__details">India</p>
                  <p className="address__details">
                    Phone Number : {checkoutAddress?.phoneNumber}
                  </p>
                </div>
              )}
            </section>
            <div className="checkout__row">
              <button
                className={
                  canPlaceOrder
                    ? "checkout__btn"
                    : "checkout__btn checkout__btn--disabled"
                }
                disabled={!canPlaceOrder}
                onClick={handlePlaceOrder}
              >
                Place Order & Pay
              </button>
              <button
                className="checkout__btn checkout__btn--ghost"
                onClick={() => navigate("/cart")}
              >
                Cancel & Go back
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CheckOutPage;
