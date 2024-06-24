import { useNavigate } from "react-router-dom";
import SingleCartItem from "@/features/cart/components/SingleCartItem";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbarApp/Navbar";
import BreadCrumbs from "@/components/ui/breadcrumbs/BreadCrumbs";
import { currencyFormatter } from "@/utils/utils";
import { useAppSelector } from "@/store/hooks";
import {
  getTotalCost,
  getTotalItems,
  selectCart,
} from "@/features/cart/cartSlice";
import Button from "@/components/ui/Button";

function Cart() {
  const totalItems = useAppSelector(getTotalItems);
  const cart = useAppSelector(selectCart);
  const navigate = useNavigate();
  document.title = "Cart | Gamers Stop";

  return (
    <>
      <Navbar />
      <BreadCrumbs />
      <main className="cart main min-h-[60vh]">
        {cart.length > 0 ? (
          <>
            <h2 className="cart__title">My Cart ({totalItems})</h2>
            <div className="cart__container">
              <ul className="cart__content">
                {cart.map((cartItem) => (
                  <SingleCartItem cartItem={cartItem} key={cartItem.id} />
                ))}
              </ul>
              <CartSummary />
            </div>
          </>
        ) : (
          <div className="cart__content cart__content--cart-empty">
            <h3 className="cart__title cart__title-empty">
              Your cart is empty
            </h3>
            <Button onClick={() => navigate("/store")}>Shop now</Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Cart;

const CartSummary = () => {
  const totalPrice = useAppSelector(getTotalCost);
  const deliveryFee = 100;
  const discount = totalPrice * 0.05;
  const grandTotal = totalPrice - discount + deliveryFee;
  const navigate = useNavigate();

  return (
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
        <Button className="w-full" onClick={() => navigate("/checkout")}>
          Check out
        </Button>
      </div>
    </div>
  );
};
