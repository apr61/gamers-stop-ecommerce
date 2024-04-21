import "./carousel.css";
import { carouselImages } from "../../data/imagesLoader";
import { useEffect, useState } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
      <Link to="/store" className="carousel__link">
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
          <ChevronLeftIcon fontSize="2rem" />
        </button>
        <button className="carousel__btn" onClick={() => nextSlide()}>
          <ChevronRightIcon fontSize="2rem" />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
