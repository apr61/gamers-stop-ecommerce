import { BsTrash } from "react-icons/bs";
import { useCartState } from "../../context/CartContext";
import { currencyFormatter } from "../../utils/utils";
import QuantityCounter from "../quantityCounter/QuantityCounter";
import "./cartItem.css";

function CartItem({ product }) {
  const { cartDispatch } = useCartState();
  function handleRemoveFromCart() {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });
  }
  return (
    <li className="cart-item">
      <div className="cart-item__image-container">
        <img
          className="cart-item__img"
          src={product.images[0]}
          alt={product.name}
        />
      </div>
      <div className="cart-item__body">
        <h3 className="cart-item__product-name">{product.name}</h3>
        <p className="cart-item__total-amount">
          {currencyFormatter(product.price)}
        </p>
        <QuantityCounter product={product} />
        <button className="cart-item__btn" onClick={handleRemoveFromCart}>
          <BsTrash />
        </button>
      </div>
    </li>
  );
}

export default CartItem;
