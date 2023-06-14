import "./home.css";

//components
import Carousel from "../../components/carousel/Carousel";
import CategoryCard from "../../components/categoryCard/CategoryCard";

//data
import { categoryData } from "../../data/imagesLoader";

// custom function to create path
import { createRouterPath } from "../../utils/utils";
import { useProductContext } from "../../context/ProductContext";

function Home() {
  const { products, productsLoading } = useProductContext();
  if (productsLoading) return <h1>Loading...</h1>;
  return (
    <>
      <Carousel />
      <section className="home__section">
        <h2 className="home__title">Shop By Categories</h2>
        <div className="home__category">
          {categoryData.map((category) => (
            <CategoryCard category={category} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
