import "./productCard.css";
import { Link, useNavigate } from "react-router-dom";
import { createRouterPath, currencyFormatter } from "../../utils/utils";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useCartState } from "../../context/CartContext";

function ProductCard({ product }) {
  const { id, images, name, price, brand, avgrating } = { ...product };
  const {
    cartState: { cart },
    cartDispatch,
  } = useCartState();
  const navigate = useNavigate();
  function handleGoToCart() {
    navigate("/cart");
  }
  function handleAddToCart() {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  }
  const isCartItem = cart.some((product) => product.id === id);
  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <img className="product-card__img" src={images[0]} alt={name} />
      </div>
      <div className="product-card__content">
        <h4 className="product-card__name">
          <Link
            className="product-card__link"
            to={`/${createRouterPath(name)}`}
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
                  <AiFillStar color="gold" key={i} className="star-icon" />
                ) : (
                  <AiOutlineStar color="gold" key={i} className="star-icon" />
                )
              )}
          </div>
          <p className="product-card__brand-name">{brand}</p>
        </div>
        <h5 className="product-card__price">{currencyFormatter(price)}</h5>
        {isCartItem ? (
          <button
            className="product-card__btn"
            onClick={() => handleGoToCart()}
          >
            Go to cart
          </button>
        ) : (
          <button
            className="product-card__btn"
            onClick={() => handleAddToCart()}
          >
            Add to cart
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
