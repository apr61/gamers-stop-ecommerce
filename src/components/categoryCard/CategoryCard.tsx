import { useNavigate } from "react-router-dom";
import "./categoryCard.css";
import { useProducts } from "../../context/ProductContext";
import { Category } from "../../utils/types";

type CategoryCardProps = {
  category : Category
}

function CategoryCard({ category } : CategoryCardProps) {
  const { name, images } = { ...category };
  const navigate = useNavigate();
  const { productDispatch } = useProducts();
  function handleImageClick(category : string) {
    productDispatch({ type: "CATEGORY", payload: category.toLowerCase() });
    navigate("/store");
  }
  return (
    <div className="category-card">
      <img
        className="category-card__img"
        src={images}
        alt={name}
        loading="lazy"
        onClick={() => handleImageClick(name)}
      />
      <h3 className="category-card__name">{name}</h3>
    </div>
  );
}

export default CategoryCard;
