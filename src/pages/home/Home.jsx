import './home.css'
import Carousel from '../../components/carousel/Carousel'
import Navbar from '../../components/navbar/Navbar'
import { categoryData } from '../../data/imagesLoader'
import CategoryCard from '../../components/categoryCard/CategoryCard'
import Slider from '../../components/slider/Slider'

function Home() {
  return (
    <>
      <Navbar />
      <main className='home-main'>
        <Carousel />
        <section className="shop-by-categories">
          <h2 className="heading-two">Shop By Categories</h2>
          <Slider>
            {categoryData.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Slider>
        </section>
      </main>
    </>
  )
}

export default Home