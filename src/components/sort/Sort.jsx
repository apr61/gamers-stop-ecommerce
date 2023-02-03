import React from 'react'
import { useFilterSortContext } from '../../context/FilterSortContext'
import './sort.css'

const actionTypeConstant = {
    'priceLowToHigh' : 'LOW_TO_HIGH',
    'priceHighToLow' : 'HIGH_TO_LOW',
    'featured' : 'FEATURED'
}

function Sort() {
    const {updateFilterHelper} = useFilterSortContext()
    function handleSelect(e){
        let value = e.target.value;
        updateFilterHelper('SORTING', value)
    }
    return (
        <div className="select-sec">
            <label className='select-sec__label' htmlFor="sort-select">Sort By :</label>
            <select className='select-sec__select' id='sort-select' onChange={handleSelect}>
                <option value="p_l-h">Price Low To High</option>
                <option value="p_h-l">Price High To Low</option>
                <option value="a-z">Name (a - z)</option>
                <option value="z-a">Name (z-a)</option>
            </select>
        </div>
    )
}

export default Sort