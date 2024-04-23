import { useCartState } from "../../context/CartContext";
import { CartItem } from "../../utils/types";
import "./quantityCounter.css";

type QuantityCounterProps = {
  cartItem: CartItem;
};

function QuantityCounter({ cartItem }: QuantityCounterProps) {
  const { cartDispatch } = useCartState();

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
  return (
    <div className="quantity-counter">
      <button
        className="quantity-counter__button"
        onClick={quantityDecrementor}
      >
        -
      </button>
      <span>{cartItem?.qty ?? 1}</span>
      <button
        className="quantity-counter__button"
        onClick={quantityIncrementor}
      >
        +
      </button>
    </div>
  );
}

export default QuantityCounter;
