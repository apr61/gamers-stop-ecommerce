import './categoryCard.css'

import React from 'react'

function CategoryCard({ category }) {
    const { name, images } = { ...category }
    return (
        <div className="category-card">
            <div className="image-container">
                <img src={images} alt={name} />
            </div>
            <h3 className="category-name">{name}</h3>
        </div>
    )
}

export default CategoryCard