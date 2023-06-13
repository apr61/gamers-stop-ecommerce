import Carousel from "../components/Carousel";
import { categoryData } from "../data/imagesLoader";

function Home() {
  return (
    <>
      <Carousel />
      <section className="my-10">
        <h2 className="text-xl font-bold pb-4">Shop By Our Top Categories</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 xl:grid-cols-6">
          {categoryData.map((category) => (
            <div
              key={category.id}
              className="rounded-xl overflow-hidden relative"
            >
              <h3 className="text-white absolute bottom-2 left-0 right-0 z-10 text-center font-bold">
                {category.name}
              </h3>
              <img
                className="object-cover hover:scale-110 duration-500 brightness-75"
                src={category.images}
                alt={category.name}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="mt-1 mb-10">
        <h2 className="text-xl font-bold pb-4">Choose By Brand</h2>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => (
            <div
              key={val}
              className="hover:outline hover:outline-1 p-4 bg-gray-100 rounded-xl"
            >
              <div className="rounded-full h-10">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/2560px-Acer_2011.svg.png"
                  alt=""
                  className="object-contain hover:scale-105 duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
