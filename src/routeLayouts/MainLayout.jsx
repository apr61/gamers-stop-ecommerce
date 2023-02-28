import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'

function MainLayout() {
  return (
    <>
        <Navbar />
            <Outlet />
        <Footer />
    </>
  )
}

export default MainLayout