import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import { UserNavbar } from "../navbar/Navbar";
import BreadCrumbs from "../ui/breadcrumbs/BreadCrumbs";
import { MainSideNav } from "../Sidenav";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <UserNavbar />
      <BreadCrumbs />
      <MainSideNav />
      <main className="flex-grow my-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
