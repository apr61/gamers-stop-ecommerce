import './productsList.css'
import ProductCard from '../../components/productCard/ProductCard'
import Filter from '../../components/filter/Filter'

import { useFilterSortContext } from '../../context/FilterSortContext'
import { useParams } from 'react-router-dom'
import { unCreateRouterPath } from '../../utils/utils'
import InputSelect from '../../components/inputSelect/InputSelect'
import { AiFillFilter } from 'react-icons/ai'
import { useState } from 'react'

const sortOptions = [
	{
		'optionName': 'Price Low To High',
		'optionValue': 'p_l-h'
	},
	{
		'optionName': 'Price High To Low',
		'optionValue': 'p_h-l'
	},
	{
		'optionName': 'Name (a-z)',
		'optionValue': 'a-z'
	},
	{
		'optionName': 'Name (z-a)',
		'optionValue': 'z-a'
	},
]

function ProductsList() {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false)
	const { category } = useParams()
	const updatedCategory = category ? unCreateRouterPath(category) : ''

	const { filterState: { filtered_products: products }, updateFilterHelper } = useFilterSortContext()

	function handleSelect(e) {
		let value = e.target.value;
		updateFilterHelper('SORTING', value)
	}

	function handleOpenFilterSection(){
		setIsFiltersOpen(!isFiltersOpen);
	}

	return (
		<>
			<div className="main category-products">
				<section className={isFiltersOpen ? "category-products__filter isFilterOpen" : "category-products__filter"}>
					<h3 className='category-products__title'>Filters</h3>
					<Filter handleOpenFilterSection={handleOpenFilterSection}/>
				</section>
				<section className="category-products__container">
					<div className="category-products__sort-sec">
						<div className="category-products__sort-wrapper">
							<h2 className='category-products__title category-products__title--h2'>All Products</h2>
							<InputSelect labelName='Sort By : ' handleSelect={handleSelect} options={sortOptions} />
						</div>
						<div className="category-products__sort-wrapper">
							<button 
							className="category-products__filter-btn"
							onClick={handleOpenFilterSection}><AiFillFilter /></button>
						</div>
					</div>
					{
						products.length > 0 ? (
							<div className="category-products__list">
								{
									products.map(product => (
										<ProductCard key={product.id} product={product} />
									))
								}
							</div>
						) : (
							<div className="category-products__empty">
								<p className="category-products__para">
									No Products Available...
								</p>
							</div>
						)
					}

				</section>
			</div>
		</>
	)
}

export default ProductsList