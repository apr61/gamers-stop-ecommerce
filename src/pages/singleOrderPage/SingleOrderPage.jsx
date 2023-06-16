import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddressCard from "../../components/accountAddress/AddressCard";
import { getOrderByIdService } from "../../services/orders";
import {
  createRouterPath,
  currencyFormatter,
  dateFormatter,
  firebaseTimestapFormatter,
} from "../../utils/utils";
import "./singleOrderPage.css";
function SingleOrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getOrderById = async (orderId) => {
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
    getOrderById(orderId);
  }, [orderId]);
  if (isLoading) return <h1>Loading...</h1>;
  console.log(order);
  const {
    id,
    orderedDate,
    orderStatus,
    productsOrdered,
    shippingAddress,
    totalAmount,
    deliveryFee,
    discount,
  } = { ...order };
  const grandTotal = totalAmount - discount + deliveryFee;
  return (
    <div className="order-page">
      <header className="order-page__header">
        <h2>Order # {id}</h2>
        <p>
          Placed date{" "}
          {dateFormatter(firebaseTimestapFormatter(orderedDate.seconds))}
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
              />
              <div className="orders__product-content">
                <Link
                  to={`/${createRouterPath(product.name)}`}
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
              <AddressCard {...shippingAddress} />
            </div>
          </section>
          <section className="order-page__sec">
            <h3>Payment Details</h3>
            <div>
              <p>Transaction # 1</p>
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
