import './controlBtn.css'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

function SliderControlButton({ control, handleFunction }) {
    return (
        <button
            className={`btn btn__control btn__control--${control}`}
            onClick={handleFunction}
        >{control === 'prev' ? <AiOutlineLeft /> : <AiOutlineRight />}
        </button>
    )
}

export default SliderControlButton
