import { useNavigate } from "react-router-dom";
import "./categoryCard.css";
import { Category } from "../../utils/types";
import { useAppDispatch } from "../../app/hooks";
import { productCategoryIn } from "../../features/products/productSlice";

type CategoryCardProps = {
  category: Category;
};

function CategoryCard({ category }: CategoryCardProps) {
  const { category: name, images } = { ...category };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function handleImageClick(category: Category) {
    dispatch(productCategoryIn(category));
    navigate("/store");
  }
  return (
    <div className="category-card">
      <img
        className="category-card__img"
        src={images}
        alt={name}
        loading="lazy"
        onClick={() => handleImageClick(category)}
      />
      <h3 className="category-card__name">{name}</h3>
    </div>
  );
}

export default CategoryCard;
