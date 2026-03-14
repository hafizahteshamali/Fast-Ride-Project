import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ServicePageLayout from '../layouts/ServicePageLayout'
import Home from '../pages/Home/Home'
import AboutUs from '../pages/About/AboutUs'
import Services from '../pages/Services/Services'
import Contact from '../pages/Contact/Contact'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<ServicePageLayout />}>
            <Route index element={<Home />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/services' element={<Services />} />
            <Route path='/contact-us' element={<Contact />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes