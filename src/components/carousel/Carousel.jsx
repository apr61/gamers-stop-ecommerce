import "./carousel.css";
import { carouselImages } from "../../data/imagesLoader";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

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
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide < carouselImages.length - 1 ? currentSlide + 1 : 0
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="carousel">
      <Link to="/store">
        <div className="carousel__image-container">
          <img
            className="carousel__img"
            src={carouselImages[currentSlide]}
            loading="lazy"
            alt={`Carousel image ${currentSlide}`}
          />
        </div>
      </Link>
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
