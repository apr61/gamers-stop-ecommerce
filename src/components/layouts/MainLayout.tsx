import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import BreadCrumbs from "../ui/breadcrumbs/BreadCrumbs";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BreadCrumbs />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
