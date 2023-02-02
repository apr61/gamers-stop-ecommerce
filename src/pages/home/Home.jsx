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

// custom function to create path
import { createRouterPath } from '../../utils/utils'
import { useProductContext } from '../../context/ProductContext'

function Home() {

  const {products} = useProductContext()
  
  return (
    <>
      <Navbar />
      <main className='main home'>
        <Carousel />
        <section className="home__section">
          <h2 className="home__title">Shop By Categories</h2>
          <Slider>
            {categoryData.map(category => (
              <Link key={category.id} to={`/${createRouterPath(category.name)}`}>
                <CategoryCard category={category} />
              </Link>
            ))}
          </Slider>
        </section>
        <section className="home__section">
          <h2 className="home__title">Latest In Graphic Cards</h2>
          <Slider>
            {products.map(product => (
              <ProductCard key={product.id} product={product} categoryHome={'Graphic Cards'} />
            ))}
          </Slider>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home