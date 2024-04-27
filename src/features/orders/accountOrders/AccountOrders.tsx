import { Link } from "react-router-dom";
import {
  currencyFormatter,
} from "../../../utils/utils";
import "./accountOrders.css";
import Loader from "../../../components/loader/Loader";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCurrentUser } from "../../auth/authSlice";
import {
  fetchOrdersByUserThunk,
  selectFilteredOrders,
  selectOrderCurrentOption,
  selectOrderStatus,
  selectOrders,
  setCurrentOption,
} from "../orderSlice";

function AccountOrders() {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const filteredOrders = useAppSelector(selectFilteredOrders);
  const isLoading = useAppSelector(selectOrderStatus);
  const currentOption = useAppSelector(selectOrderCurrentOption);

  useEffect(() => {
    dispatch(fetchOrdersByUserThunk(currentUser?.uid as string));
  }, [currentUser?.uid]);

  return (
    <div className="orders main">
      <header className="orders__main-header">
        <h2 className="orders__title">My Orders</h2>
        <div>
          <select
            onChange={(e) => dispatch(setCurrentOption(e.target.value))}
            className="input_select"
            value={currentOption}
          >
            <option className="orders__options" value="all-orders">
              All orders
            </option>
            <option className="orders__options" value="delivered">
              Delivered
            </option>
            <option className="orders__options" value="yet-to-be-shipped">
              Yet to be shipped
            </option>
            <option className="orders__options" value="cancelled">
              Cancelled
            </option>
          </select>
        </div>
      </header>
      <p>
        Showing {filteredOrders.length} of {orders.length}
      </p>
      <div className="orders__container">
        <ul className="orders__list">
          {isLoading === "loading" ? (
            <Loader />
          ) : filteredOrders.length === 0 ? (
            <p className="orders__empty">No Orders are available...</p>
          ) : (
            filteredOrders.map((order) => (
              <li className="orders__item" key={order.id}>
                <header className="orders__header">
                  <div className="orders__header-item">
                    <p className="orders__desc">
                      Order #{" "}
                      <Link to={order.id} className="orders__link">
                        {order.id}
                      </Link>
                    </p>
                  </div>
                  <div className="orders__header-item">
                    <p className="orders__desc">Placed date</p>
                    <p className="orders__desc">{order.orderedDate}</p>
                  </div>
                  <div className="orders__header-item">
                    <p className="orders__desc">Total</p>
                    <p className="orders__desc">
                      {currencyFormatter(order.totalAmount + order.deliveryFee)}
                    </p>
                  </div>
                  <div className="orders__header-item">
                    <p className="orders__desc">Ship To</p>
                    <p className="orders__desc">
                      {order.shippingAddress.fullname}
                    </p>
                  </div>
                </header>
                <section className="orders__body">
                  <h3 className="orders__sub-title">{order.orderStatus}</h3>
                  <div className="orders__products">
                    {order.productsOrdered.map((product) => (
                      <article className="orders__product" key={product.id}>
                        <img
                          className="orders__product-img"
                          src={product.images[0]}
                          alt={product.name}
                          loading="lazy"
                        />
                        <div className="orders__product-content">
                          <Link
                            to={`/store/${product.slugurl}`}
                            className="orders__link"
                          >
                            {product.name}
                          </Link>
                          <p className="orders__desc">
                            Quantity Ordered : {product.qty}
                          </p>
                          <p className="orders__desc">
                            Sub Total :{" "}
                            {currencyFormatter(product.qty * product.price)}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default AccountOrders;
