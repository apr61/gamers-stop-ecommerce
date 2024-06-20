import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbarApp/Navbar";
import BreadCrumbs from "../ui/breadcrumbs/BreadCrumbs";

function MainLayout() {
  return (
    <>
      <Navbar />
      <BreadCrumbs />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
