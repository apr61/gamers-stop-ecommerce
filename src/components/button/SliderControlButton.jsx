import './style.css'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

function SliderControlButton({ control, handleFunction }) {
    return (
        <button className={`btn ${control}`} onClick={handleFunction}>
           {control === 'prev' ? <AiOutlineLeft /> : <AiOutlineRight />}
        </button>
    )
}

export default SliderControlButton
