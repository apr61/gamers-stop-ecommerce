import { BsTrash } from "react-icons/bs";
import { useCartState } from "../../context/CartContext";
import { currencyFormatter, createRouterPath } from "../../utils/utils";
import QuantityCounter from "../quantityCounter/QuantityCounter";
import "./cartItem.css";
import { Link } from "react-router-dom";

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
          loading="lazy"
        />
      </div>
      <div className="cart-item__body">
        <Link
          to={`/store/${createRouterPath(product.name)}`}
          state={{ productId: product.id }}
          className="cart-item__product-name"
        >
          {product.name}
        </Link>
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
