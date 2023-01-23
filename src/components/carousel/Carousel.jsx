import './carousel.css'
import { carouselImages } from '../../data/imagesLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    function nextSlide(){
        setCurrentSlide(currentSlide === carouselImages.length-1 ? 0 : currentSlide+1)
    }
    function prevSlide(){
        setCurrentSlide(currentSlide === 0 ? carouselImages.length-1 : currentSlide-1)
    }
    console.log(currentSlide)
    return (
        <div className="carousel">
            <div className="imageContainer">
                <img src={carouselImages[currentSlide]} />
            </div>
            <button className="btn prev" onClick={prevSlide}><FontAwesomeIcon icon="fa-solid fa-left-long" /></button>
            <button className="btn next" onClick={nextSlide}><FontAwesomeIcon icon="fa-solid fa-right-long" /></button>
            <div className="circle-nav">
                {carouselImages.map((_, i) => (
                    <button key={i} className={i === currentSlide ? "circle active" : "circle"} onClick={() => setCurrentSlide(i)}></button>
                ))}
            </div>
        </div>
    )
}

export default Carousel