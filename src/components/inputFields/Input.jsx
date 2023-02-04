import React,{ useId } from 'react'
import './input.css'

const Input = React.forwardRef((props, ref) => {
    const id = useId()
    const {labelName, placeholder, inputType} = props
  return (
    <div className="input-group">
        <label htmlFor={id} className='input-group__label'>{labelName}</label>
        <input className='input-group__input' type={inputType} placeholder={placeholder} id={id} ref={ref}/>
    </div>
  )
})

export default Input