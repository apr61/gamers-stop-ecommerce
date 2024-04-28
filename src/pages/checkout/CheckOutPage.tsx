import { useEffect, useState } from "react";
import "./checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { currencyFormatter } from "../../utils/utils";
import { createAnOrderService } from "../../services/orders";
import Loader from "../../components/loader/Loader";
import AddIcon from "@mui/icons-material/Add";
import { Address, OrderData, RazorpayPaymentResponse } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllCartItems,
  getTotalCost,
  getTotalItems,
} from "../../features/cart/cartSlice";
import {
  fetchAddressByUser,
  selectAddressStatus,
  selectAddresses,
} from "../../features/address/addressSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";

function CheckOutPage() {
  document.title = "Checkout | Gamers Stop";
  const [checkoutAddress, setCheckoutAddress] = useState<Address | null>(null);
  const currentUser = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cart = useAppSelector(getAllCartItems);
  const totalPrice = useAppSelector(getTotalCost);
  const totalItems = useAppSelector(getTotalItems);
  const isLoading = useAppSelector(selectAddressStatus);
  const addresses = useAppSelector(selectAddresses);

  const deliveryFee = 100;
  const discount = totalPrice * 0.05;
  const grandTotal = totalPrice - discount + deliveryFee;
  const canPlaceOrder = checkoutAddress != null;

  const handlePaymentSuccess = async (response: RazorpayPaymentResponse) => {
    const newOrder: OrderData = {
      paymentId: response.razorpay_payment_id as string,
      shippingAddress: checkoutAddress!,
      paymentStatus: "paid",
      orderStatus: "yet-to-be-shipped",
      orderedDate: new Date().toString(),
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
    image:
      "https://firebasestorage.googleapis.com/v0/b/gamers-stop-ecom-dev.appspot.com/o/favicon.ico?alt=media&token=26721467-df11-408f-bb40-31670d555e36",
    handler: (response: RazorpayPaymentResponse) =>
      handlePaymentSuccess(response),
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
    dispatch(fetchAddressByUser(currentUser?.uid as string));
    if (isLoading === "loading") return;
    setCheckoutAddress(addresses[0]);
  }, [currentUser?.uid, dispatch]);

  return (
    <>
      <section className="checkout">
        <h2 className="checkout__title">Check Out</h2>
        <div className="checkout__body">
          <section className="checkout__address">
            <h3 className="checkout__title">Select Address</h3>
            {isLoading === "loading" ? (
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
                        {address.name}
                      </h4>
                      <p className="address__details">{address.address}</p>
                      <p className="address__details">{address.townLocality}</p>
                      <p className="address__details">
                        {address.cityDistrict}, {address.state.toUpperCase()}{" "}
                        {address.pincode}
                      </p>
                      <p className="address__details">India</p>
                      <p className="address__details">
                        Mobile : {address.phoneNumber}
                      </p>
                    </label>
                  </div>
                ))}
                <Link className="checkout__link" to="/account/addresses/new">
                  <AddIcon /> Add new address
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
              {isLoading === "loading" ? (
                <Loader />
              ) : !canPlaceOrder ? (
                <div className="checkout__selected-address">
                  <p className="checkout__address-empty">No address selected</p>
                  <p className="checkout__address-empty">
                    Please select from left section or create a new address
                  </p>
                </div>
              ) : (
                <div className="checkout__selected-address">
                  <h4 className="address__details address__details--heading">
                    {checkoutAddress?.name}
                  </h4>
                  <p className="address__details">{checkoutAddress?.address}</p>
                  <p className="address__details">
                    {checkoutAddress?.townLocality}
                  </p>
                  <p className="address__details">
                    {checkoutAddress?.cityDistrict}, {checkoutAddress?.state}{" "}
                    {checkoutAddress?.pincode}
                  </p>
                  <p className="address__details">
                    Mobile : {checkoutAddress?.phoneNumber}
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
