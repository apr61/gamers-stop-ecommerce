import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import { getOrderByIdService } from "../../../services/orders";
import "./orderSuccessful.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Link, Navigate, useParams } from "react-router-dom";
import { Order } from "../../../utils/types";
import Loader from "../../../components/loader/Loader";

function OrderSuccessful() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const getOrderById = async (orderId: string) => {
    try {
      const data = await getOrderByIdService(orderId);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrderById(orderId as string);
  }, [orderId]);

  if (isLoading) return <Loader />;

  if (order === null) {
    return <Navigate to="/account/orders" />;
  }
  const { shippingAddress, productsOrdered } = order;
  return (
    <>
      <Navbar />
      <section className="ordersuccess main">
        <div className="ordersuccess__body">
          <h2 className="ordersuccess__title">
            <>
              <VerifiedIcon />
            </>{" "}
            Order Placed, thank you.
          </h2>
          <p className="ordersuccess__desc">
            Confirmation will be sent to your email.
          </p>
          <p className="ordersuccess__address">
            <span className="ordersuccess__name">
              Shipping to {shippingAddress.name},
            </span>
            {shippingAddress?.address},{shippingAddress?.townLocality},{" "}
            {shippingAddress?.cityDistrict.toUpperCase()},{" "}
            {shippingAddress?.state.toUpperCase()},{shippingAddress?.pincode},
            Phone Number: {shippingAddress?.phoneNumber}
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
