import { useNavigate } from "react-router-dom";
import "./categoryCard.css";
import { Category } from "../../utils/types";

type CategoryCardProps = {
  category: Category;
};

function CategoryCard({ category }: CategoryCardProps) {
  const { category: name, images } = { ...category };
  const navigate = useNavigate();
  return (
    <div className="category-card">
      <img
        className="category-card__img"
        src={images}
        alt={name}
        loading="lazy"
        onClick={() => {}}
      />
      <h3 className="category-card__name">{name}</h3>
    </div>
  );
}

export default CategoryCard;
