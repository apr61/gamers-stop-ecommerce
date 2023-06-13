import { carouselImages } from "../data/imagesLoader";
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
    <section className="relative">
      <div className="hover:shadow-inner">
        <img
          loading="lazy"
          className="brightness-75"
          alt={`carousel img ${currentSlide}`}
          src={carouselImages[currentSlide]}
        />
      </div>
      <div className="absolute bottom-2 text-white left-0 right-0 max-w-[5rem] mx-auto flex items-center justify-center">
        <button
          className="w-8 h-8 rounded-full text-xl sm:text-2xl"
          onClick={() => prevSlide()}
        >
          <AiOutlineLeft />
        </button>
        <button
          className="w-8 h-8 rounded-full text-xl sm:text-2xl"
          onClick={() => nextSlide()}
        >
          <AiOutlineRight />
        </button>
      </div>
    </section>
  );
}

export default Carousel;
