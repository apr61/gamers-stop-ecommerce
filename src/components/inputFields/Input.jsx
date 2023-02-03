import { useId } from 'react'
import './input.css'

function Input({labelName, inputType, placeholder}) {
    const id = useId()
  return (
    <div className="input-group">
        <label htmlFor={id} className='input-group__label'>{labelName}</label>
        <input className='input-group__input' type={inputType} placeholder={placeholder} id={id}/>
    </div>
  )
}

export default Input