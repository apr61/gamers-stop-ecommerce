import DeleteIcon from "@mui/icons-material/Delete";
import { currencyFormatter } from "../../../utils/utils";
import QuantityCounter from "../quantityCounter/QuantityCounter";
import "./cartItem.css";
import { Link } from "react-router-dom";
import { CartItem } from "../../../utils/types";
import { useAppDispatch } from "../../../app/hooks";
import { removeFromCart } from "../cartSlice";

type CartItemProps = {
  cartItem: CartItem;
};

function SingleCartItem({ cartItem }: CartItemProps) {
  const dispatch = useAppDispatch();
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
        <div className="cart-item__link-name">
          <Link
            to={`/store/${cartItem.slugurl}`}
            className="cart-item__cartItem-name"
          >
            {cartItem.name}
          </Link>
          <p className="cart-item__total-amount">
            {currencyFormatter(cartItem.price)}
          </p>
        </div>
        <div className="cart-item__btn-wrapper">
          <QuantityCounter cartItem={cartItem} />
          <button
            className="cart-item__btn"
            onClick={() => dispatch(removeFromCart(cartItem))}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </li>
  );
}

export default SingleCartItem;
