import { createSearchParams, useNavigate } from "react-router-dom";
import "./categoryCard.css";
import { Category } from "../../utils/types";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";

type CategoryCardProps = {
  category: Category;
};

function CategoryCard({ category }: CategoryCardProps) {
  const { category: name, images } = { ...category };
  const navigate = useNavigate();
  const { setProductsSearchParams } = useFilteredProducts();
  function handleImageClick(category: Category) {
    const categoryName = category.category.toLowerCase()
    setProductsSearchParams((prev) => {
      prev.set("category", categoryName);
      return prev;
    }, {replace: true});
    navigate({
      pathname: "/store",
      search: createSearchParams({ category: categoryName }).toString(),
    });
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
