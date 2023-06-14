import "./carousel.css";
import { carouselImages } from "../../data/imagesLoader";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  function nextSlide() {
    setCurrentSlide(
      currentSlide === carouselImages.length - 1 ? 0 : currentSlide + 1
    );
  }
  function prevSlide() {
    setCurrentSlide(
      currentSlide === 0 ? carouselImages.length - 1 : currentSlide - 1
    );
  }
  return (
    <div className="carousel">
      <div className="carousel__image-container">
        <img className="carousel__img" src={carouselImages[currentSlide]} />
      </div>
      <div className="carousel__btn__container">
        <button className="carousel__btn" onClick={() => prevSlide()}>
          <span>
            <AiOutlineLeft />
          </span>
        </button>
        <button className="carousel__btn" onClick={() => nextSlide()}>
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
