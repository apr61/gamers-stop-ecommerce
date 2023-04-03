import { useId } from 'react'
import './filterInputs.css'
import { AiFillStar } from 'react-icons/ai'
import { useFilterSortContext } from '../../../context/FilterSortContext'

function FilterInputs({ name, inputType = 'checkbox', type, labelName, icon, isChecked, payload }) {
	const cId = useId()
	const {updateFilterHelper, filterState:{activeFilters}} = useFilterSortContext()
	function handleFilterInputChange(){
		updateFilterHelper('UPDATE_FILTER_VALUE', {filterName: name, filterValue: payload})
		if(activeFilters.filter(filter => filter.labelName === labelName).length === 0){
			updateFilterHelper('ADD_ACTIVE_FILTER', {type, labelName})
		}else{
			updateFilterHelper('REMOVE_ACTIVE_FILTER', labelName)
		}
	}
	return (
		<div className="check-box">
			<input type={inputType} name={name} id={cId} checked={isChecked}
				onChange={handleFilterInputChange} className='check-box__input' />
			<label className='check-box__label' htmlFor={cId}>{icon ? <>{labelName} <AiFillStar /> {'& up'}</> : labelName}</label>
		</div>
	)
}

export default FilterInputs