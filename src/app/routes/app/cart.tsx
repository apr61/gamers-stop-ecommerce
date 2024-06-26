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
      <main className="min-h-[60vh] max-w-6xl mx-auto my-8 w-full px-2 md:px-4">
        {cart.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-8 text-center">
              My Cart ({totalItems})
            </h2>
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <ul className="flex-[4] flex flex-col gap-4">
                {cart.map((cartItem) => (
                  <SingleCartItem cartItem={cartItem} key={cartItem.id} />
                ))}
              </ul>
              <CartSummary />
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 bg-accent justify-center items-center min-h-[25rem] rounded-md">
            <h3 className="text-xl font-medium">Your cart is empty</h3>
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
    <div className="flex-[1.5] border border-border p-4 rounded-lg md:max-w-sm w-full md:self-end">
      <h3 className="text-xl font-medium mb-8 text-center border-b border-border pb-2">
        Summary
      </h3>
      <table className="w-full">
        <tbody>
          <tr className="flex justify-between my-2">
            <th>SUB TOTAL</th>
            <td>{currencyFormatter(totalPrice)}</td>
          </tr>
          <tr className="flex justify-between my-2">
            <th>Discount(5%)</th>
            <td>-{currencyFormatter(discount)}</td>
          </tr>
          <tr className="flex justify-between my-2">
            <th>Delivery Fee</th>
            <td>+{currencyFormatter(deliveryFee)}</td>
          </tr>
          <tr className="flex justify-between my-2 border-t-2 border-b-2 border-border py-2 font-medium">
            <th>ORDER TOTAL</th>
            <td>{currencyFormatter(grandTotal)}</td>
          </tr>
        </tbody>
      </table>
      <Button
        className="w-full text-xl mt-2"
        onClick={() => navigate("/checkout")}
      >
        Check out
      </Button>
    </div>
  );
};
