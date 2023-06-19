import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./orderSuccessful.css";
import { MdVerified } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function OrderSuccessful() {
  const location = useLocation();
  const {
    order: { shippingAddress, productsOrdered },
  } = location?.state;
  return (
    <>
      <Navbar />
      <section className="ordersuccess main">
        <div className="ordersuccess__body">
          <h2 className="ordersuccess__title">
            <>
              <MdVerified />
            </>{" "}
            Order Placed, thank you.
          </h2>
          <p className="ordersuccess__desc">
            Confirmation will be sent to your email.
          </p>
          <p className="ordersuccess__address">
            <span className="ordersuccess__name">
              Shipping to {shippingAddress.fullName},
            </span>
            {shippingAddress?.flat}, {shippingAddress?.area},{" "}
            {shippingAddress?.town.toUpperCase()},{" "}
            {shippingAddress?.state.toUpperCase()},{shippingAddress?.pincode},
            India, Phone Number: {shippingAddress?.phoneNumber}
          </p>
          <div className="ordersuccess__summary">
            <div className="ordersucess__product">
              <p className="ordersuccess__desc ordersuccess__desc--bold">
                Product Details
              </p>
              <p className="ordersuccess__desc">{productsOrdered[0].name}</p>
            </div>
          </div>
          <Link to="/account/orders" className="ordersuccess__link">
            Review or edit your recent orders &gt;
          </Link>
        </div>
        <Link
          to="/store"
          className="ordersuccess__link ordersuccess__link--btn"
        >
          Continue Shopping
        </Link>
      </section>
    </>
  );
}

export default OrderSuccessful;
