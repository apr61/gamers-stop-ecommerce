//components
import Carousel from "@/components/carousel/Carousel";
import CategoryCard from "@/components/categoryCard/CategoryCard";

//data
import { categoryData } from "@/data/imagesLoader";

function Home() {
  document.title = "Gamers Stop";

  return (
    <div className="px-2">
      <Carousel />
      <section className="home__section">
        <h2 className="home__title">Shop By Categories</h2>
        <div className="home__category">
          {categoryData.map((category) => (
            <CategoryCard key={category.category} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
