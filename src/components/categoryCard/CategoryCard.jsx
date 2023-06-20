import { useNavigate } from "react-router-dom";
import "./categoryCard.css";
import { useProducts } from "../../context/ProductContext";

function CategoryCard({ category }) {
  const { name, images } = { ...category };
  const navigate = useNavigate();
  const { productDispatch } = useProducts();
  function handleImageClick(category) {
    productDispatch({ type: "CATEGORY", payload: category.toLowerCase() });
    navigate("/store");
  }
  return (
    <div className="category-card">
      <img
        className="category-card__img"
        src={images}
        alt={name}
        onClick={() => handleImageClick(name)}
      />
      <h3 className="category-card__name">{name}</h3>
    </div>
  );
}

export default CategoryCard;
