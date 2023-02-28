import './categoryCard.css'

import React from 'react'

function CategoryCard({ category }) {
    const { name, images } = { ...category }
    return (
        <div className="category-card">
            <div className="category-card__image-container">
                <img className='category-card__img' src={images} alt={name} />
            </div>
            <h3 className="category-card__name">{name}</h3>
        </div>
    )
}

export default CategoryCard