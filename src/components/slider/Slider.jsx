import './slider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

function Slider({ children }) {
    const [slideNumber, setSlideNumber] = useState(0)
    function prevCards() {
        setSlideNumber(0)
    }
    function nextCards() {
        setSlideNumber(1)
    }
    return (
        <div className="slider">
            <div className="slider-container" style={{ transform: `translateX(-${slideNumber * 100}%)` }}>
                {children}
            </div>
            <button className="btn prev" onClick={prevCards}><FontAwesomeIcon icon="fa-solid fa-left-long" /></button>
            <button className="btn next" onClick={nextCards}><FontAwesomeIcon icon="fa-solid fa-right-long" /></button>
        </div>
    )
}

export default Slider