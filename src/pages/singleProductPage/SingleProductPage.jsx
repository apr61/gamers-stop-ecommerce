import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { currencyFormatter } from "../../utils/utils";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import "./singleProductPage.css";

import QuantityCounter from "../../components/quantityCounter/QuantityCounter";

import ProductImages from "../../components/productImages/ProductImages";
import { useCartState } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { getProductByIdService } from "../../services/products";

function SingleProductPage() {
  // getting state
  const location = useLocation();
  const productId = location.state?.productId;
  const navigate = useNavigate();
  const {
    cartDispatch,
    cartState: { cart },
  } = useCartState();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const getProductById = async (productId) => {
    try {
      const data = await getProductByIdService(productId);
      setProduct({ ...data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProductById(productId);
  }, [productId]);

  if (isLoading) return <h1>Loading...</h1>;

  const {
    id,
    name,
    images,
    brand,
    memory,
    price,
    description,
    manufacturer,
    category,
    quantity,
    avgrating,
  } = {
    ...product,
  };

  document.title = `${name} | Gamers Stop`;

  const isItemInCart = cart.some((item) => item.id === id);

  function handleAddToCart() {
    if (isItemInCart) return navigate("/cart");
    cartDispatch({ type: "ADD_TO_CART", payload: product });
  }

  return (
    <>
      <div className="main product-page">
        <div className="product-page__image-container">
          <ProductImages images={images} name={name} />
        </div>
        <div className="product-page__content">
          <header className="product-page__header">
            <h3 className="product-page__name">{name}</h3>
            <div className="product-page__row">
              <p className="product-page__price">{currencyFormatter(price)}</p>
              <p className="product-page__rating">
                {avgrating}
                <AiFillStar color="gold" />
              </p>
            </div>
            <p className="product-page__desc">{description}</p>
          </header>
          <QuantityCounter product={product} />

          <div className="product-page__section">
            <div className="product-page__row">
              <button
                className="product-page__button"
                onClick={() => handleAddToCart()}
              >
                {isItemInCart ? (
                  "Go To Cart"
                ) : (
                  <>
                    <FaShoppingCart />
                    Add To Cart
                  </>
                )}
              </button>
              <button className="product-page__button">
                <AiFillHeart />
                Add To Wish List
              </button>
            </div>
          </div>
          <section className="product-page__section">
            <h4 className="product-page__title">About Item</h4>
            <table className="product-page__table">
              <tbody>
                <tr>
                  <th className="product-page__th">Manufacuturer</th>
                  <td className="product-page__td">{manufacturer}</td>
                </tr>
                <tr>
                  <th className="product-page__th">Brand</th>
                  <td className="product-page__td">{brand}</td>
                </tr>
                <tr>
                  <th className="product-page__th">Memory</th>
                  <td className="product-page__td">{memory}</td>
                </tr>
                <tr>
                  <th className="product-page__th">Category</th>
                  <td className="product-page__td">{category}</td>
                </tr>
                <tr>
                  <th className="product-page__th">Availability</th>
                  <td className="product-page__td">
                    {quantity > 0 ? "In Stock" : "Out Of Stock"}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="product-page__section">
            <h4 className="product-page__title">Services Available</h4>
            <ul className="product-page__list">
              <li>Delivery in 2-3 business days</li>
              <li>14 Days replacement</li>
              <li>Gamers Stop Delivered</li>
              <li>1 Year Warrenty</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default SingleProductPage;
