import './home.css'
import { Link } from 'react-router-dom'

//components
import Carousel from '../../components/carousel/Carousel'
import Navbar from '../../components/navbar/Navbar'
import CategoryCard from '../../components/categoryCard/CategoryCard'
import Slider from '../../components/slider/Slider'
import ProductCard from '../../components/productCard/ProductCard'
import Footer from '../../components/footer/Footer'

//data
import { categoryData } from '../../data/imagesLoader'
import { products } from '../../data/productsData'

// custom function to create path
import { createRouterPath } from '../../utils/utils'

function Home() {
  return (
    <>
      <Navbar />
      <main className='main'>
        <Carousel />
        <section className="categories">
          <h2 className="heading-two">Shop By Categories</h2>
          <Slider>
            {categoryData.map(category => (
              <Link key={category.id} to={`/${createRouterPath(category.name)}`}>
                <CategoryCard category={category} />
              </Link>
            ))}
          </Slider>
        </section>
        <section className="categories">
          <h2 className="heading-two">Latest In Graphic Cards</h2>
          <Slider>
            {products.map(product => (
              <ProductCard key={product.id} product={product} categoryHome={'Graphic Cards'}/>
            ))}
          </Slider>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home