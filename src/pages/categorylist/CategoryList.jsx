import './categoryList.css'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/productCard/ProductCard'
import Filter from '../../components/filter/Filter'
import { useFilterContext } from '../../context/FilterContext'

//data
import { products } from '../../data/productsData'

// custom function to uncreate path
import { unCreateRouterPath } from '../../utils/utils'


function CategoryList() {
	const { category } = useParams()
	const categoryUpdated = unCreateRouterPath(category)

	const { filterState: { outOfStock, brands, rating, itemCondition } } = useFilterContext()

	let categoryFilteredProducts = products.filter(product => product.category === categoryUpdated && product.quantity > 0)

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

	let filteredData = filteredProducts() ? filteredProducts() : categoryFilteredProducts
	return (
		<>
			<Navbar />
			<div className="main category-products">
				<section className="category-products__filter">
					<h3 className='category-products__title'>Filters</h3>
					<Filter products={categoryFilteredProducts} filterProducts={filteredData}/>
				</section>
				<section className="category-products__container">
					<h2>{categoryUpdated.toUpperCase()}</h2>
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

export default CategoryList