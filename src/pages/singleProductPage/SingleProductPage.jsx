import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBalanceScale, FaRupeeSign } from "react-icons/fa";
import { currencyFormatter } from "../../utils/utils";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import "./singleProductPage.css";

import CartButtons from "../../components/cartButtons/CartButtons";
import QuantityCounter from "../../components/quantityCounter/QuantityCounter";

import ProductImages from "../../components/productImages/ProductImages";
import { getProductById } from "../../services/products";
import { useAsync } from "../../hooks/useAsync";
import { useCartState } from "../../context/CartContext";

function SingleProductPage() {
  // getting state
  const location = useLocation();
  const productId = location.state?.productId;
  const navigate = useNavigate();

  const { cartDispatch } = useCartState();

  // filtering products based on product id
  const {
    loading,
    error,
    value: product,
  } = useAsync(() => getProductById(productId), [productId]);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  const { id, name, images, brand, memory, price, description, manufacturer } =
    { ...product };
  function handleBuyNow() {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
    navigate("/checkout");
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
            <p className="product-page__price">{currencyFormatter(price)}</p>
            <p className="product-page__desc">{description}</p>
          </header>
          <QuantityCounter product={product} />

          <div className="product-page__section">
            <div className="product-page__btn-wrapper">
              <CartButtons id={id} product={product} />
              <button
                className="product-page__button product-page__button--buy-now"
                onClick={handleBuyNow}
              >
                <>
                  <FiShoppingBag />
                </>{" "}
                Buy Now
              </button>
            </div>
            <div className="product-page__btn-wrapper">
              <button className="product-page__button">
                <AiOutlineHeart />
                Add To Wish List
              </button>
              <button className="product-page__button">
                <FaBalanceScale />
                Add To Compare
              </button>
            </div>
          </div>
          <div className="product-page__section">
            <h4 className="product-page__title">Offers</h4>
            <ul className="product-page__list">
              <li>Offer 1</li>
              <li>Offer 2</li>
              <li>Offer 3</li>
              <li>Offer 4</li>
            </ul>
          </div>
          <div className="product-page__section">
            <h4 className="product-page__title">Services Available</h4>
            <ul className="product-page__list">
              <li>Free Delivery</li>
              <li>14 Days replacement</li>
              <li>Gamers Stop Delivered</li>
              <li>1 Year Warrenty</li>
            </ul>
          </div>
          <div className="product-page__section">
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
              </tbody>
            </table>
          </div>
          <div className="product-page__section">
            <h4 className="product-page__title">Seller Info</h4>
            <p className="product-page__seller-name">kharidiye dot com </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProductPage;
