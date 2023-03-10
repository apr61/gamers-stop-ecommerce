import './slider.css'
import { useState } from 'react'
import SliderControlButton from '../button/sliderControlBtn/SliderControlButton'
import useWindowSize from '../../hooks/useWindowSize'

function Slider({ children }) {
    const [slideNumber, setSlideNumber] = useState(0)
    const { width } = useWindowSize()
    const itemsPerRow = Math.ceil((width - 140) / 256)
    const totalItems = children.length

    const sliderSlidingStyle = {
        transform: `translateX(-${slideNumber * 256}px)`
    }
    function prevCards() {
        if (slideNumber > 0) {
            setSlideNumber(slideNumber < itemsPerRow ? 0 : slideNumber - itemsPerRow)
        }
    }
    function nextCards() {
        if (slideNumber < totalItems - itemsPerRow) {
            setSlideNumber(totalItems - (slideNumber + itemsPerRow) < itemsPerRow ? slideNumber + (totalItems - (slideNumber + itemsPerRow)) : slideNumber + itemsPerRow)
        }
    }
    return (
        <div className="slider">
            <div className="slider__wrapper">
                <div className='slider__container' style={sliderSlidingStyle}>
                    {children}
                </div>
                <SliderControlButton control={'prev'} handleFunction={prevCards} />
                <SliderControlButton control={'next'} handleFunction={nextCards} />
            </div>
        </div>

    )
}

export default Slider