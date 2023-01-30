import { useId } from 'react'
import './inputCheckBox.css'
import { AiFillStar } from 'react-icons/ai'

function InputCheckBox({name, labelName, icon}) {
    const cId = useId()
  return (
    <div className="check-box">
        <input type="checkbox" name={name} id={cId}  className='check-box__input'/>
        <label className='check-box__label' htmlFor={cId}>{icon ? <>{labelName} <AiFillStar /> {'& up'}</> : labelName}</label>
    </div>
  )
}

export default InputCheckBox