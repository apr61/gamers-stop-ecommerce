import './categoryList.css'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useParams } from 'react-router-dom'

//data
import { products } from '../../data/productsData'
import ProductCard from '../../components/productCard/ProductCard'

// custom function to uncreate path
import { unCreateRouterPath } from '../../utils/PathNameFormatter'


function CategoryList() {
  const { category } = useParams()
  const categoryUpdated = unCreateRouterPath(category)
  return (
    <>
      <Navbar />
      <div className="main category-products">
        <section className="filter">
          <h2>Filter</h2>
        </section>
        <section className="products-list">
          <h2>{categoryUpdated.toUpperCase()}</h2>
          <div className="products-list-container">
            {
              products.filter(product => product.category === categoryUpdated).map((product => (
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