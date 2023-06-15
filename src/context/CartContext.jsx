import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";

const Cart = createContext();

export function useCartState() {
  return useContext(Cart);
}

const initialState = {
  cart: JSON.parse(localStorage.getItem("gamers-stop-cart"))?.cart || [],
};

function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    localStorage.setItem("gamers-stop-cart", JSON.stringify(cartState));
  }, [cartState.cart]);

  const totalItems = cartState.cart.reduce((acc, curr) => acc + curr.qty, 0);
  const totalPrice = cartState.cart.reduce(
    (acc, curr) => (acc + curr.price) * curr.qty,
    0
  );
  const deliveryFee = 100;
  const discount = totalPrice * 0.05;
  const grandTotal = totalPrice - discount + deliveryFee;

  return (
    <Cart.Provider value={{ cartState, cartDispatch, totalItems, totalPrice, deliveryFee, discount, grandTotal }}>
      {children}
    </Cart.Provider>
  );
}

export default CartProvider;
