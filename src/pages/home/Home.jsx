import './home.css'
import Carousel from '../../components/carousel/Carousel'
import Navbar from '../../components/navbar/Navbar'
import { categoryData } from '../../data/imagesLoader'
import CategoryCard from '../../components/categoryCard/CategoryCard'
import Slider from '../../components/slider/Slider'
import { products } from '../../data/productsData'
import ProductCard from '../../components/productCard/ProductCard'
import Footer from '../../components/footer/Footer'

function Home() {
  return (
    <>
      <Navbar />
      <main className='home-main'>
        <Carousel />
        <section className="categories">
          <h2 className="heading-two">Shop By Categories</h2>
          <Slider>
            {categoryData.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Slider>
        </section>
        <section className="categories">
          <h2 className="heading-two">Latest In Graphic Cards</h2>
          <Slider>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home