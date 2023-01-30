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
        <section className="category-products__filter">
          <h3 className='category-products__title'>Filters</h3>
          <Filter products={categoryFilteredProducts}/>
        </section>
        <section className="category-products__container">
          <h2>{categoryUpdated.toUpperCase()}</h2>
          <div className="category-products__list">
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