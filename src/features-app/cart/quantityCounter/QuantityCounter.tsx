import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  decrement,
  getCartItemById,
  increment,
} from "../cartSlice";
import { CartItem } from "../../../utils/types";
import "./quantityCounter.css";

type QuantityCounterProps = {
  cartItem: CartItem;
};

function QuantityCounter({ cartItem }: QuantityCounterProps) {
  const dispatch = useAppDispatch();
  const existsInCart = useAppSelector(getCartItemById(cartItem.id));
  return existsInCart ? (
    <div className="quantity-counter">
      <button
        className="quantity-counter__button"
        onClick={() => dispatch(decrement(cartItem))}
      >
        -
      </button>
      <span>{existsInCart && existsInCart.qty}</span>
      <button
        className="quantity-counter__button"
        onClick={() => dispatch(increment(cartItem))}
      >
        +
      </button>
    </div>
  ) : null;
}

export default QuantityCounter;
