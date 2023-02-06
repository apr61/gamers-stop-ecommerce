import React, { useId } from 'react'
import './inputSelect.css'

function InputSelect({labelName, handleSelect, options, customClass}) {
    const id = useId()
    return (
        <div className={!customClass ? 'select-sec' : `select-sec ${customClass}`}>
            <label className='select-sec__label' htmlFor={id}>{labelName}</label>
            <select className='select-sec__select' id={id} onChange={handleSelect}>
                {
                    options.map((option, i) => (
                        <option key={i} value={option.optionValue}>{option.optionName}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default InputSelect