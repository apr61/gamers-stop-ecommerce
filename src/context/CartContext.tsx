import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import cartReducer from "../reducers/cartReducer";
import { CartItem } from "../utils/types";

export type CartContextType = {
  cartState: CartStateType;
  cartDispatch: React.Dispatch<ReducerAction>;
  totalItems: number;
  totalPrice: number;
  deliveryFee: number;
  discount: number;
  grandTotal: number;
};

export type CartStateType = {
  cart: CartItem[];
};

export const CART_REDUCER_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  QUANTITY_INCREMENTOR: "QUANTITY_INCREMENTOR",
  QUANTITY_DECREMENTOR: "QUANTITY_DECREMENTOR",
};

export type CartReducerType = typeof CART_REDUCER_ACTION_TYPES;

export type ReducerAction = {
  type: string;
  payload: CartItem;
};

const cartStateInit: CartStateType = {
  cart:
    JSON.parse(localStorage.getItem("gamers-stop-cart") as string)?.cart || [],
};

const CartContextInit: CartContextType = {
  cartState: cartStateInit,
  cartDispatch: () => {},
  totalItems: 0,
  totalPrice: 0,
  grandTotal: 0,
  discount: 0,
  deliveryFee: 0,
};

const CartContext = createContext<CartContextType>(CartContextInit);

type ChildrenType = {
  children: ReactElement | ReactElement[];
};

function CartProvider({ children }: ChildrenType) {
  const [cartState, cartDispatch] = useReducer(cartReducer, cartStateInit);

  useEffect(() => {
    localStorage.setItem("gamers-stop-cart", JSON.stringify(cartState));
  }, [cartState.cart]);

  const totalItems = cartState.cart.reduce((acc, curr) => {
    return acc + curr.qty;
  }, 0);
  const totalPrice = cartState.cart.reduce((acc, curr) => {
    return ((acc + curr.price) * curr.qty);
  }, 0);
  const deliveryFee = 100;
  const discount = totalPrice * 0.05;
  const grandTotal = totalPrice - discount + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cartState,
        cartDispatch,
        totalItems,
        totalPrice,
        deliveryFee,
        discount,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

export function useCartState() {
  return useContext(CartContext);
}
