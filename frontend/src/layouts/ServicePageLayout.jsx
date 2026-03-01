import React from 'react'
import Header from '../navigation/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../navigation/Footer'

const ServicePageLayout = () => {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default ServicePageLayout