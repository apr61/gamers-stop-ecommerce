import './productsList.css'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import ProductCard from '../../components/productCard/ProductCard'
import Filter from '../../components/filter/Filter'
import Sort from '../../components/sort/Sort'

import { useFilterSortContext } from '../../context/FilterSortContext'
import { useProductContext } from '../../context/ProductContext'


function ProductsList() {

	const { filterState: { outOfStock, brands, rating, itemCondition }} = useFilterSortContext()

	const {products} = useProductContext()

	function filteredProducts() {
		let filtered;
		if (outOfStock) {
			filtered = products.filter(product => product.category === categoryUpdated)
		}
		if (brands.length > 0) {
			filtered = products.filter(product => brands.indexOf(product.brand) !== -1)
		}
		if (rating > 0) {
			filtered = products.filter(product => product.avgrating >= rating)
		}
		if (itemCondition) {
			filtered = products.filter(product => product.itemconditon === itemCondition)
		}
		return filtered
	}

	let filteredData = filteredProducts() ? filteredProducts() : products
	return (
		<>
			<Navbar />
			<div className="main category-products">
				<section className="category-products__filter">
					<h3 className='category-products__title'>Filters</h3>
					<Filter products={products} filterProducts={filteredData} />
				</section>
				<section className="category-products__container">
					<div className="category-products__sort-sec">
						<h2>All Products</h2>
						<Sort />
					</div>
					<div className="category-products__list">
						{
							filteredData.map((product => (
								<ProductCard key={product.id} product={product} />
							)))
						}
					</div>
				</section>
			</div>
			<Footer />
		</>
	)
}

export default ProductsList