import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="max-w-[80rem] mx-auto flex-grow-1 px-2 my-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
