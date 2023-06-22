import "./home.css";

//components
import Carousel from "../../components/carousel/Carousel";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

//data
import { categoryData } from "../../data/imagesLoader";

function Home() {
  document.title = "Gamers Stop";
  return (
    <>
      <Navbar />
      <main className="main">
        <Carousel />
        <section className="home__section">
          <h2 className="home__title">Shop By Categories</h2>
          <div className="home__category">
            {categoryData.map((category, i) => (
              <CategoryCard key={category + i} category={category} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
