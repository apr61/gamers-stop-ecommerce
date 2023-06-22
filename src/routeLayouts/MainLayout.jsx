import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import BreadCrumbs from "../components/breadcrumbs/BreadCrumbs";

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
