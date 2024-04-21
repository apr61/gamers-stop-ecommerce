import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { currencyFormatter } from "../../utils/utils";
import "./singleProductPage.css";

import QuantityCounter from "../../components/quantityCounter/QuantityCounter";
import Loader from "../../components/loader/Loader";
import ProductImages from "../../components/productImages/ProductImages";
import { useCartState } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { getProductByIdService } from "../../services/products";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { CartItem, Product } from "../../utils/types";

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
  const [product, setProduct] = useState<Product | null>(null);
  const getProductById = async (productId: string) => {
    try {
      const data = await getProductByIdService(productId);
      setProduct(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProductById(productId);
  }, [productId]);

  if (isLoading) return <Loader />;

  if(product === null){
    <Navigate to="/store" />
  }

  document.title = `${name} | Gamers Stop`;

  const isItemInCart = cart.some((item) => item.id === product?.id);
  const isOutOfStock = product?.quantity! <= 0 ? true : false;

  function handleAddToCart() {
    if (isItemInCart) return navigate("/cart");
    cartDispatch({ type: "ADD_TO_CART", payload: product as CartItem });
  }

  return (
    <>
      <div className="main product-page">
        <div className="product-page__image-container">
          <ProductImages images={product?.images} name={name} />
        </div>
        <div className="product-page__content">
          <header className="product-page__header">
            <h3 className="product-page__name">{product?.name}</h3>
            <div className="product-page__row">
              <p className="product-page__price">{currencyFormatter(product?.price!)}</p>
              <p className="product-page__rating">
                {product?.avgrating}
                <StarIcon htmlColor="gold" />
              </p>
            </div>
            <p className="product-page__desc">{product?.description}</p>
          </header>
          <QuantityCounter product={product} />

          <div className="product-page__section">
            <div className="product-page__row product-page__row--col">
              <button
                className={
                  isOutOfStock
                    ? "product-page__button product-page__button--out-of-stock"
                    : "product-page__button"
                }
                onClick={() => handleAddToCart()}
              >
                {isOutOfStock ? (
                  "Out of stock"
                ) : isItemInCart ? (
                  "Go To Cart"
                ) : (
                  <>
                    <ShoppingCartIcon />
                    Add To Cart
                  </>
                )}
              </button>
              <button className="product-page__button">
                <FavoriteBorderIcon />
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
                  <td className="product-page__td">{product?.manufacturer}</td>
                </tr>
                <tr>
                  <th className="product-page__th">Brand</th>
                  <td className="product-page__td">{product?.brand}</td>
                </tr>
                <tr>
                  <th className="product-page__th">Memory</th>
                  <td className="product-page__td">{product?.memory}</td>
                </tr>
                <tr>
                  <th className="product-page__th">Category</th>
                  <td className="product-page__td">{product?.category}</td>
                </tr>
                <tr>
                  <th className="product-page__th">Availability</th>
                  <td className="product-page__td">
                    {product?.quantity! > 0 ? "In Stock" : "Out Of Stock"}
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
