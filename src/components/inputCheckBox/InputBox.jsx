import { useId } from 'react'
import './inputCheckBox.css'
import { AiFillStar } from 'react-icons/ai'
import { useFilterSortContext } from '../../context/FilterSortContext'

function InputBox({ name, inputType = 'checkbox', type, labelName, icon, isChecked, payload }) {
	const cId = useId()
	const { filterDispatch } = useFilterSortContext()
	function handleChange() {
		filterDispatch({
			type: type,
			payload: payload
		})
	}
	return (
		<div className="check-box">
			<input type={inputType} name={name} id={cId} checked={isChecked}
				onChange={handleChange} className='check-box__input' />
			<label className='check-box__label' htmlFor={cId}>{icon ? <>{labelName} <AiFillStar /> {'& up'}</> : labelName}</label>
		</div>
	)
}

export default InputBox