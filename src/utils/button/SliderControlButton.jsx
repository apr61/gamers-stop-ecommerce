import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SliderControlButton({ control, handleFunction }) {
    return (
        <button className={`btn ${control}`} onClick={handleFunction}>
            <FontAwesomeIcon icon={`fa-solid ${control === 'prev' ? 'fa-left-long' : 'fa-right-long'}`} />
        </button>
    )
}

export default SliderControlButton
