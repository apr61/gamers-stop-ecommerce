import DeleteIcon from '@mui/icons-material/Delete';
import { useCartState } from "../../context/CartContext";
import { currencyFormatter, createRouterPath } from "../../utils/utils";
import QuantityCounter from "../quantityCounter/QuantityCounter";
import "./cartItem.css";
import { Link } from "react-router-dom";
import { CartItem } from '../../utils/types';

type CartItemProps = {
  cartItem: CartItem
}

function SingleCartItem({ cartItem } : CartItemProps) {
  const { cartDispatch } = useCartState();
  function handleRemoveFromCart() {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: cartItem,
    });
  }
  return (
    <li className="cart-item">
      <div className="cart-item__image-container">
        <img
          className="cart-item__img"
          src={cartItem.images[0]}
          alt={cartItem.name}
          loading="lazy"
        />
      </div>
      <div className="cart-item__body">
        <Link
          to={`/store/${createRouterPath(cartItem.name)}`}
          state={{ cartItemId: cartItem.id }}
          className="cart-item__cartItem-name"
        >
          {cartItem.name}
        </Link>
        <p className="cart-item__total-amount">
          {currencyFormatter(cartItem.price)}
        </p>
        <QuantityCounter cartItem={cartItem} />
        <button className="cart-item__btn" onClick={handleRemoveFromCart}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
}

export default SingleCartItem;
