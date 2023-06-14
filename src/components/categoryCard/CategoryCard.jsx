import "./categoryCard.css";

import React from "react";

function CategoryCard({ category }) {
  const { name, images } = { ...category };
  return (
    <div className="category-card">
      <img className="category-card__img" src={images} alt={name} />
      <h3 className="category-card__name">{name}</h3>
    </div>
  );
}

export default CategoryCard;
