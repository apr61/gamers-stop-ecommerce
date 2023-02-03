import { useId } from 'react'
import './filterInputs.css'
import { AiFillStar } from 'react-icons/ai'
import { useFilterSortContext } from '../../../context/FilterSortContext'

function FilterInputs({ name, inputType = 'checkbox', type, labelName, icon, isChecked, payload }) {
	const cId = useId()
	const {updateFilterHelper} = useFilterSortContext()
	return (
		<div className="check-box">
			<input type={inputType} name={name} id={cId} checked={isChecked}
				onChange={() => {updateFilterHelper(type, payload)}} className='check-box__input' />
			<label className='check-box__label' htmlFor={cId}>{icon ? <>{labelName} <AiFillStar /> {'& up'}</> : labelName}</label>
		</div>
	)
}

export default FilterInputs