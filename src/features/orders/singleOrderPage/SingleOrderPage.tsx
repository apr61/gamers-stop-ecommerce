import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AddressCard from "../../address/accountAddress/AddressCard";
import { getOrderByIdService } from "../../../services/orders";
import {
  currencyFormatter,
} from "../../../utils/utils";
import "./singleOrderPage.css";
import Loader from "../../../components/loader/Loader";
import { Order } from "../../../utils/types";

function SingleOrderPage() {
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

  if(order === null){
    return <Navigate to="/account/orders" />
  }

  const {
    id,
    orderedDate,
    orderStatus,
    productsOrdered,
    shippingAddress,
    totalAmount,
    deliveryFee,
    discount,
    paymentId,
  } = { ...order };
  const grandTotal = totalAmount - discount + deliveryFee;
  return (
    <div className="order-page">
      <header className="order-page__header">
        <h2 className="order-page__title">Order # {id}</h2>
        <p>
          Placed date{" "}
          {orderedDate}
        </p>
      </header>
      <p className="order-page__status">Status : {orderStatus}</p>
      <div className="order-page__body">
        <div className="orders__products">
          {productsOrdered.map((product) => (
            <article
              className="orders__product orders__product--order-page"
              key={product.id}
            >
              <img
                className="orders__product-img"
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
              />
              <div className="orders__product-content">
                <Link
                  to={`/${product.slugurl}`}
                  className="orders__link"
                  state={{ productId: product.id }}
                >
                  {product.name}
                </Link>
                <p className="orders__desc">Quantity Ordered : {product.qty}</p>
                <p className="orders__desc">
                  Sub Total : {currencyFormatter(product.qty * product.price)}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="order-page__container">
          <section className="order-page__sec">
            <h3>Shipping address</h3>
            <div>
              <AddressCard address={shippingAddress} />
            </div>
          </section>
          <section className="order-page__sec">
            <h3>Payment Details</h3>
            <div>
              <p>Transaction # {paymentId}</p>
            </div>
          </section>
          <section className="order-page__sec">
            <h3>Payment Summary</h3>
            <div>
              <table className="order-page__table">
                <tbody>
                  <tr className="order-page__trow">
                    <th className="order-page__th">Total Price</th>
                    <td>{currencyFormatter(totalAmount)}</td>
                  </tr>
                  <tr className="order-page__trow">
                    <th className="order-page__th">Total Discount (5%)</th>
                    <td>- {currencyFormatter(discount)}</td>
                  </tr>
                  <tr className="order-page__trow">
                    <th className="order-page__th">Delivery Fee</th>
                    <td>+ {currencyFormatter(deliveryFee)}</td>
                  </tr>
                  <tr className="order-page__trow order-page__trow--grand-total">
                    <th className="order-page__th order-page__th--grand-total">
                      Grand total
                    </th>
                    <td>{currencyFormatter(grandTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SingleOrderPage;
