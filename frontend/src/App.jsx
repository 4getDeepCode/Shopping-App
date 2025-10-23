import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import AdminFeatures from './pages/admin-view/features'
import AdminDashboard from './pages/admin-view/dashboard'

import PageNotFound from './pages/not-found'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingLayout from './components/shopping-view/layout'


function App() {


  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1>header component</h1>

      <Routes>

        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<AuthLogin/>}/>
          <Route path='register' element={<AuthRegister/>}/>
        </Route>


        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='features' element={<AdminFeatures/>}/>
          <Route path='products' element={<AdminProducts/>}/>
          <Route path='orders' element={<AdminOrders/>}/>
        </Route>

        <Route path='/shop' element={<ShoppingLayout/>}>
            <Route path='home' element={<ShoppingHome/>}/>
            <Route path='listing' element={<ShoppingListing/>}/>
            <Route path='checkout' element={<ShoppingCheckout/>}/>
            <Route path='account' element={<ShoppingAccount/>}/>
        </Route>

        <Route path='*' element={<PageNotFound/>}/>

      </Routes>

    </div>

  )
}

export default App

