import './productsList.css'
import ProductCard from '../../components/productCard/ProductCard'
import Filter from '../../components/filter/Filter'

import { useFilterSortContext } from '../../context/FilterSortContext'
import { useParams } from 'react-router-dom'
import { currencyFormatter, unCreateRouterPath } from '../../utils/utils'
import InputSelect from '../../components/inputSelect/InputSelect'
import { AiFillFilter, AiFillStar, AiOutlineClose } from 'react-icons/ai'
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

	const { filterState: { filtered_products: products, activeFilters }, updateFilterHelper } = useFilterSortContext()

	function handleSelect(e) {
		let value = e.target.value;
		updateFilterHelper('SORTING', value)
	}

	function handleOpenFilterSection() {
		setIsFiltersOpen(!isFiltersOpen);
	}

	function handleClearAllFilters() {
		updateFilterHelper('CLEAR_ALL_FILTERS')
	}

	function handleRemoveFilter(type, labelName) {
		updateFilterHelper(type, labelName)
		updateFilterHelper('REMOVE_ACTIVE_FILTER', labelName)
	}
	return (
		<>
			<div className="main category-products">
				<section className={isFiltersOpen ? "category-products__filter isFilterOpen" : "category-products__filter"}>
					<h3 className='category-products__title'>Filters</h3>
					<Filter handleOpenFilterSection={handleOpenFilterSection} />
				</section>
				<section className="category-products__container">
					<div className="category-products__sort-sec">
						<h2 className='category-products__title category-products__title--h2'>All Products</h2>
						<div className="category-products__sort-wrapper">
							<p className="categorty-products__items-found">
								{products.length} items found
							</p>
							<InputSelect labelName='Sort By : ' handleSelect={handleSelect} options={sortOptions} />
						</div>
						<div className="category-products__sort-wrapper category-products__sort-wrapper--min-hgt">
							{
								activeFilters.length !== 0 && (
									<div className="category-products__active--filters">
										{
											activeFilters.map((data, i) => (
												<button key={i + 999} className="category-products__filter-btn category-products__filter-btn--clear-filter"
												>{data.type === 'RATING' ? <>{data.labelName} <AiFillStar /> {'& up'}</> :
													data.type === 'PRICE' ? currencyFormatter(0, 0) + '-' + currencyFormatter(data.labelName) : data.labelName}
													<AiOutlineClose onClick={() => handleRemoveFilter(data.type, data.labelName)} /></button>
											))
										}
										<button className="category-products__filter-btn category-products__filter-btn--clear-all-filter"
											onClick={handleClearAllFilters}>Clear all filters</button>
									</div>
								)
							}

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
										<ProductCard key={product.id} product={product} customStyles={'category-products__products-card--width'}/>
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
			</div >
		</>
	)
}

export default ProductsList