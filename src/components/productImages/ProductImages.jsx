import { useState } from 'react'
import './productImages.css'

function ProductImages({ images, name }) {
    const [mainImage, setMainImage] = useState(0)
    return (
        <div className="product-images">
            <div className="main-image">
                <img src={images[mainImage]} alt={name} />
            </div>
            <div className="other-images">
                {images.map((image,i) => (
                    <div key={name + i + 1} className={mainImage === i ? "image-box active-box" : "image-box"} onMouseOver={() => {setMainImage(i)}}>
                        <img src={image} alt={name + i + 1} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductImages