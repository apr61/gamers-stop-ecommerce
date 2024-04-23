import { useNavigate } from "react-router-dom";
import SingleCartItem from "../../components/cartItem/SingleCartItem";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import { useCartState } from "../../context/CartContext";
import { currencyFormatter } from "../../utils/utils";
import "./cart.css";

function Cart() {
  const {
    cartState: { cart },
    totalItems,
    totalPrice,
    deliveryFee,
    discount,
    grandTotal,
  } = useCartState();
  const navigate = useNavigate();
  document.title = "Cart | Gamers Stop";
  return (
    <>
      <Navbar />
      <BreadCrumbs />
      <main className="cart main">
        {cart.length > 0 ? (
          <>
            <h2 className="cart__title">My Cart ({totalItems})</h2>
            <div className="cart__container">
              <ul className="cart__content">
                {cart.map((cartItem) => (
                  <SingleCartItem cartItem={cartItem} key={cartItem.id} />
                ))}
              </ul>
              <div className="cart__summary">
                <h3 className="cart__title cart__title--summary">Summary</h3>
                <div className="cart__content">
                  <table>
                    <tbody>
                      <tr className="summary__row">
                        <th>SUB TOTAL</th>
                        <td>{currencyFormatter(totalPrice)}</td>
                      </tr>
                      <tr className="summary__row">
                        <th>Discount(5%)</th>
                        <td>-{currencyFormatter(discount)}</td>
                      </tr>
                      <tr className="summary__row">
                        <th>Delivery Fee</th>
                        <td>+{currencyFormatter(deliveryFee)}</td>
                      </tr>
                      <tr className="summary__row cart__total-amount">
                        <th>ORDER TOTAL</th>
                        <td>{currencyFormatter(grandTotal)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    className="cart__checkout-btn"
                    onClick={() => navigate("/checkout")}
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="cart__content cart__content--cart-empty">
            <h3 className="cart__title cart__title-empty">
              Your cart is empty
            </h3>
            <button
              className="cart__checkout-btn"
              onClick={() => navigate("/store")}
            >
              Shop Now
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Cart;
