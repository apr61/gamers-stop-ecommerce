import React from 'react'
import { useFilterSortContext } from '../../context/FilterSortContext'
import './sort.css'

const actionTypeConstant = {
    'priceLowToHigh' : 'LOW_TO_HIGH',
    'priceHighToLow' : 'HIGH_TO_LOW',
    'featured' : 'FEATURED'
}

function Sort() {
    // const {sortDispatch} = useFilterSortContext()
    function handleSelect(e){
        let value = e.target.value;
        console.log(e.target.value)
        // sortDispatch({
        //     type: actionTypeConstant[value]
        // })
    }
    return (
        <div className="select-sec">
            <label className='select-sec__label' htmlFor="sort-select">Sort By :</label>
            <select className='select-sec__select' id='sort-select' onChange={handleSelect}>
                <option value="priceLowToHigh">Price Low To High</option>
                <option value="priceHighToLow">Price High To Low</option>
                <option value="featured">Featured</option>
            </select>
        </div>
    )
}

export default Sort