import './productsList.css'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import ProductCard from '../../components/productCard/ProductCard'
import Filter from '../../components/filter/Filter'
import Sort from '../../components/sort/Sort'

import { useFilterSortContext } from '../../context/FilterSortContext'
import { useParams } from 'react-router-dom'
import { unCreateRouterPath } from '../../utils/utils'


function ProductsList() {
	const { category } = useParams()
	const updatedCategory = category ? unCreateRouterPath(category) : ''

	const { filterState: { filtered_products: products } } = useFilterSortContext()


	return (
		<>
			<Navbar />
			<div className="main category-products">
				<section className="category-products__filter">
					<h3 className='category-products__title'>Filters</h3>
					<Filter products={products} />
				</section>
				<section className="category-products__container">
					<div className="category-products__sort-sec">
						<h2>All Products</h2>
						<Sort />
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
			<Footer />
		</>
	)
}

export default ProductsList