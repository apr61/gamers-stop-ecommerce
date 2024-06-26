import { useState } from "react";
import "./productImages.css";

type ProductImagesProps = {
  images: string[],
  name: string
}

function ProductImages({ images, name } : ProductImagesProps) {
  const [mainImage, setMainImage] = useState(0);
  return (
    <div className="product-images">
      <div className="product-images__main-image">
        <img
          className="product-images__img"
          src={images[mainImage]}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="product-images__other-images">
        {images.map((image, i) => (
          <div
            key={name + i + 1}
            className={
              mainImage === i
                ? "product-images__image-box product-images__image-box--active"
                : "product-images__image-box"
            }
            onClick={() => {
              setMainImage(i);
            }}
          >
            <img
              className="product-images__img"
              src={image}
              alt={name + i + 1}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
