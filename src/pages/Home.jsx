import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <NavBar />
        <main className="max-w-[80rem] mx-auto flex-grow-1 px-1 my-1">
          <Carousel />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;
