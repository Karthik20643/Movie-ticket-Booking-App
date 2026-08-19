import React, { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'   // default import (was {Navbar})
import Home from './pages/Home'           // create or adjust path if needed
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import Checkout from './pages/Checkout'
import Favourite from './pages/Favourite'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
const safeDefault = (p) => p.then(m => ({ default: m.default || Object.values(m)[0] }))

const AdminLayout = React.lazy(() => safeDefault(import('./pages/admin/Layout')))
const AdminDashboard = React.lazy(() => safeDefault(import('./pages/admin/Dashboard')))
const AddShows = React.lazy(() => safeDefault(import('./pages/admin/AddShows')))
const ListShows = React.lazy(() => safeDefault(import('./pages/admin/ListShows')))
const ListBookings = React.lazy(() => safeDefault(import('./pages/admin/ListBookings')))
const App = () => {
  const isadminpage =  useLocation() .pathname.startsWith('/admin')
  return (
    <>
     { !isadminpage &&  <Navbar /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/moviedetails/:id" element={<MovieDetails />} />
        <Route path="/seat/:id/:date" element={<SeatLayout />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/admin/*" element={
          <Suspense fallback={<div className="text-white p-6">Loading admin...</div>}>
            <AdminLayout />
          </Suspense>
        }>
          <Route index element={<Suspense fallback={<div className="text-white p-6">Loading...</div>}><AdminDashboard /></Suspense>} />
          <Route path="add-shows" element={<Suspense fallback={<div className="text-white p-6">Loading...</div>}><AddShows /></Suspense>} />
          <Route path="list-shows" element={<Suspense fallback={<div className="text-white p-6">Loading...</div>}><ListShows /></Suspense>} />
          <Route path="list-bookings" element={<Suspense fallback={<div className="text-white p-6">Loading...</div>}><ListBookings /></Suspense>} />
        </Route>
      </Routes>
                        {  !isadminpage  &&  <Footer /> }

    </>
  )
}

export default App