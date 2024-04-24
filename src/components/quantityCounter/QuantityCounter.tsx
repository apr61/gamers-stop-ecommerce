import { useCartState } from "../../context/CartContext";
import { CartItem } from "../../utils/types";
import "./quantityCounter.css";

type QuantityCounterProps = {
  cartItem: CartItem;
};

function QuantityCounter({ cartItem }: QuantityCounterProps) {
  const { cartState, cartDispatch } = useCartState();
  const existsInCart = cartState.cart.find(cart => cart.id === cartItem.id)
  
  const quantityDecrementor = () => {
    cartDispatch({
      type: "QUANTITY_DECREMENTOR",
      payload: cartItem,
    });
  };

  const quantityIncrementor = () => {
    cartDispatch({
      type: "QUANTITY_INCREMENTOR",
      payload: cartItem,
    });
  };
  return existsInCart ? (
    <div className="quantity-counter">
      <button
        className="quantity-counter__button"
        onClick={quantityDecrementor}
      >
        -
      </button>
      <span>{existsInCart.qty}</span>
      <button
        className="quantity-counter__button"
        onClick={quantityIncrementor}
      >
        +
      </button>
    </div>
  ) : null
}

export default QuantityCounter;
