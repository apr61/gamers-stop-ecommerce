import './categoryList.css'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useParams } from 'react-router-dom'

//data
import { products } from '../../data/productsData'
import ProductCard from '../../components/productCard/ProductCard'

// custom function to uncreate path
import { unCreateRouterPath } from '../../utils/utils'
import Filter from '../../components/filter/Filter'


function CategoryList() {
  const { category } = useParams()
  const categoryUpdated = unCreateRouterPath(category)
  const categoryFilteredProducts = products.filter(product => product.category === categoryUpdated)
  return (
    <>
      <Navbar />
      <div className="main category-products">
        <section className="filter">
          <h3>Filters</h3>
          <Filter products={categoryFilteredProducts}/>
        </section>
        <section className="products-list">
          <h2>{categoryUpdated.toUpperCase()}</h2>
          <div className="products-list-container">
            {
              categoryFilteredProducts.map((product => (
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