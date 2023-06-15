import { Link, useNavigate } from "react-router-dom";
import CartItem from "../../components/cartItem/CartItem";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useCartState } from "../../context/CartContext";
import { currencyFormatter } from "../../utils/utils";
import "./cart.css";

function Cart() {
  const {
    cartState: { cart },
    totalItems,
    totalPrice,
  } = useCartState();
  const navigate = useNavigate();
  document.title = "Cart | Gamers Stop";
  const deliveryFee = 100;
  const discount = totalPrice * 0.1;
  const grandTotal = totalPrice - discount + deliveryFee;
  return (
    <>
      <Navbar />
      <div className="cart main">
        {cart.length > 0 ? (
          <>
            <h2 className="cart__title">My Cart ({totalItems})</h2>
            <div className="cart__container">
              <ul className="cart__content">
                {cart.map((product) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ul>
              <div className="cart__summary">
                <h3 className="cart__title cart__title--summary">Summary</h3>
                <div className="cart__content">
                  <table>
                    <tbody>
                      <tr className="summary__row">
                        <td>SUB TOTAL</td>
                        <td>{currencyFormatter(totalPrice)}</td>
                      </tr>
                      <tr className="summary__row">
                        <td>Discount</td>
                        <td>-{currencyFormatter(discount)}</td>
                      </tr>
                      <tr className="summary__row">
                        <td>Delivery Fee</td>
                        <td>+{currencyFormatter(deliveryFee)}</td>
                      </tr>
                      <tr className="summary__row cart__total-amount">
                        <td>ORDER TOTAL</td>
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
      </div>
      <Footer />
    </>
  );
}

export default Cart;
