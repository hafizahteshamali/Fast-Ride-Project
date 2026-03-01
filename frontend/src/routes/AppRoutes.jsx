import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ServicePageLayout from '../layouts/ServicePageLayout'
import Home from '../pages/Home/Home'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<ServicePageLayout />}>
            <Route index element={<Home />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes