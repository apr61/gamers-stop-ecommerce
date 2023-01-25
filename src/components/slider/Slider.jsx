import './slider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import SliderControlButton from '../../utils/button/SliderControlButton'

function Slider({ children, itemsPerRow }) {
    const [slideNumber, setSlideNumber] = useState(0)

    const sliderSlidingStyle = {
        transform: `translateX(-${slideNumber * 16}rem)`
    }
    function prevCards() {
        if(slideNumber>0){
            setSlideNumber(slideNumber-1)
        }
    }
    function nextCards() {
        if(slideNumber<children.length-itemsPerRow){
            setSlideNumber(slideNumber+1)
        }
    }
    return (
        <div className="slider">
            <div className='slider-container' style={sliderSlidingStyle}>
                {children}
            </div>
            <SliderControlButton control={'prev'} handleFunction={prevCards}/>
            <SliderControlButton control={'next'} handleFunction={nextCards}/>
        </div>
    )
}

export default Slider