import "./productCard.css";
import { Link, useNavigate } from "react-router-dom";
import { createRouterPath, currencyFormatter } from "../../utils/utils";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useCartState } from "../../context/CartContext";

function ProductCard({ product }) {
  const { id, images, name, price, brand, avgrating } = { ...product };
  const {
    cartState: { cart },
    cartDispatch,
  } = useCartState();

  const navigate = useNavigate();
  const isCartItem = cart.some((product) => product.id === id);
  const isOutOfStock = product.quantity === 0;

  function handleAddToCart() {
    if (isCartItem) return navigate("/cart");
    cartDispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  }
  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <img
          className="product-card__img"
          src={images[0]}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="product-card__content">
        <h4 className="product-card__name">
          <Link
            className="product-card__link"
            to={`/store/${createRouterPath(name)}`}
            state={{ productId: id }}
          >
            {name}
          </Link>
        </h4>
        <div className="product-card__row">
          <div className="product-card__rating">
            {new Array(5)
              .fill(0)
              .map((_, i) =>
                i < avgrating ? (
                  <StarIcon htmlColor="gold" key={i} className="star-icon" />
                ) : (
                  <StarOutlineIcon htmlColor="gold" key={i} className="star-icon" />
                )
              )}
          </div>
          <p className="product-card__brand-name">{brand}</p>
        </div>
        <h5 className="product-card__price">{currencyFormatter(price)}</h5>
        <button
          className={
            isOutOfStock
              ? "product-card__btn product-card__btn--out-of-stock"
              : "product-card__btn"
          }
          onClick={() => handleAddToCart()}
          disabled={isOutOfStock}
        >
          {isOutOfStock
            ? "Out Of Stock"
            : isCartItem
            ? "Go to cart"
            : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
