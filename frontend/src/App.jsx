// import { useEffect, useState } from 'react'
// import { Route, Routes } from 'react-router-dom'
// import AuthLayout from './components/auth/layout'
// import AuthLogin from './pages/auth/login'
// import AuthRegister from './pages/auth/register'
// import AdminLayout from './components/admin-view/layout'
// import AdminOrders from './pages/admin-view/orders'
// import AdminProducts from './pages/admin-view/products'
// import AdminFeatures from './pages/admin-view/features'
// import AdminDashboard from './pages/admin-view/dashboard'
// import PageNotFound from './pages/not-found'
// import ShoppingAccount from './pages/shopping-view/account'
// import ShoppingCheckout from './pages/shopping-view/checkout'
// import ShoppingListing from './pages/shopping-view/listing'
// import ShoppingHome from './pages/shopping-view/home'
// import ShoppingLayout from './components/shopping-view/layout'
// import CheckAuth from './components/common/check-auth'
// import UnAuthPage from './pages/unauth-page'
// import { useDispatch, useSelector } from 'react-redux'
// import { checkAuth } from './store/auth-slice'
// import { Skeleton } from './components/ui/skeleton'
// import PaypalReturnPage from './pages/shopping-view/paypal-return'
// import PaymentSuccessPage from './pages/shopping-view/payment-success'
// import SearchProducts from './pages/shopping-view/search'



// function App() {

//   const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

//   console.log(isLoading, user);


  

//   return (
//     <div className="flex flex-col overflow-hidden bg-white">
//       <Routes>

//         <Route path="/"
//           element={
//             <CheckAuth
//               isAuthenticated={isAuthenticated}
//               user={user}
//             ></CheckAuth>
//           }
//         />

//         <Route path='/auth' element={
//           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//             <AuthLayout />
//           </CheckAuth>
//         }>
//           <Route path='login' element={<AuthLogin />} />
//           <Route path='register' element={<AuthRegister />} />
//         </Route>


//         <Route path='/admin' element={
//           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//             <AdminLayout />
//           </CheckAuth>
//         }>
//           <Route path='dashboard' element={<AdminDashboard />} />
//           <Route path='features' element={<AdminFeatures />} />
//           <Route path='products' element={<AdminProducts />} />
//           <Route path='orders' element={<AdminOrders />} />
//         </Route>

//         <Route path='/shop' element={
//           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//             <ShoppingLayout />
//           </CheckAuth>
//         }>
//           <Route path='home' element={<ShoppingHome />} />
//           <Route path='listing' element={<ShoppingListing />} />
//           <Route path='checkout' element={<ShoppingCheckout />} />
//           <Route path='account' element={<ShoppingAccount />} />
//           <Route path="paypal-return" element={<PaypalReturnPage />} />
//           <Route path="payment-success" element={<PaymentSuccessPage />} />
//           <Route path="search" element={<SearchProducts />} />
//         </Route>

//         <Route path='*' element={<PageNotFound />} />
//         <Route path='/unauth-page' element={<UnAuthPage />} />

//       </Routes>

//     </div>

//   )
// }

// export default App



















import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
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
import CheckAuth from './components/common/check-auth'
import UnAuthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from './components/ui/skeleton'
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import PaymentSuccessPage from './pages/shopping-view/payment-success'
import SearchProducts from './pages/shopping-view/search'

// Simple protected route component
function ProtectedRoute({ isAuthenticated, children }) {
  // if not logged in, redirect to login (you can change to /unauth-page if you want)
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }
  return children
}

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>

        <Route path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            />
          }
        />

        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>

        {/* Admin area remains fully protected (wrap whole admin area in ProtectedRoute) */}
        <Route path='/admin' element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          </ProtectedRoute>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>

        {/* SHOP: layout is public (so browsing UI is accessible),
            but specific routes are protected */}
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          {/* public pages: anyone can view */}
          <Route path='home' element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='search' element={<SearchProducts />} />

          {/* protected pages: require login */}
          <Route
            path='checkout'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ShoppingCheckout />
              </ProtectedRoute>
            }
          />
          <Route
            path='account'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ShoppingAccount />
              </ProtectedRoute>
            }
          />

          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
        </Route>

        <Route path='/unauth-page' element={<UnAuthPage />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </div>
  )
}

export default App
















