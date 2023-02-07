import React, { useId } from 'react'
import './inputSelect.css'

const InputSelect = React.forwardRef((props, ref) =>{
    const id = useId()
    const {labelName, handleSelect, options, customClass, value} = props
    return (
        <div className={!customClass ? 'select-sec' : `select-sec ${customClass}`}>
            <label className='select-sec__label' htmlFor={id}>{labelName}</label>
            <select className='select-sec__select' id={id} onChange={handleSelect} ref={ref} defaultValue={value}>
                {
                    options.map((option, i) => (
                        <option key={i} value={option.optionValue}>{option.optionName}</option>
                    ))
                }
            </select>
        </div>
    )
})

export default InputSelect