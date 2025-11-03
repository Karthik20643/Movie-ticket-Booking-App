import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'   // default import (was {Navbar})
import Home from './pages/Home'           // create or adjust path if needed
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import Favourite from './pages/Favourite'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
const App = () => {
  const isadminpage =  useLocation() .pathname.startsWith('/admin')
  return (
    <>
     { !isadminpage &&  <Navbar /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/moviedetails/:id" element={<MovieDetails />} />
      </Routes>
                        {  !isadminpage  &&  <Footer /> }

    </>
  )
}

export default App