import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { dummyBookingData } from '../assets/assets'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || 'USD'

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    // simulate fetch — use dummy data for now
    setBookings(dummyBookingData || [])
    setIsLoading(false)
  }

  useEffect(() => {
    getMyBookings()
  }, [])

  const { state } = useLocation()

  const formatCurrency = (amt) => {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amt)
    } catch (e) {
      return `${currency} ${amt}`
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {/* show session booking passed via navigation state */}
      {state ? (
        <div className="bg-white/5 rounded-lg p-6 mb-6">
          <div className="text-sm text-gray-400">Latest Booking (this session)</div>
          <div className="font-medium text-lg">{state.movie?.title || state.movie?.name}</div>
          <div className="text-sm text-gray-400 mt-2">Show ID: {state.showId}</div>
          <div className="text-sm text-gray-400">Date: {state.date}</div>
          <div className="text-sm text-gray-400">Time: {state.time?.time || state.time}</div>
          <div className="text-sm text-gray-400 mt-2">Seats:</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.isArray(state.seats) && state.seats.map((s) => (
              <span key={s} className="px-3 py-1 bg-primary text-black rounded">{s}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white/5 rounded-lg p-6 mb-6">
          <div className="text-sm text-gray-400">No recent session booking</div>
        </div>
      )}

      <h3 className="text-lg font-semibold mb-3">Previous Bookings</h3>

      {isLoading ? (
        <div className="text-gray-400">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-gray-400">You have no bookings.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((item, idx) => (
            <div key={item._id ?? idx} className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white/5 border border-primary/20 rounded-lg p-4">
              <img src={item.show.movie.poster_path} alt={item.show.movie.title} className="w-36 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="font-medium text-lg">{item.show.movie.title}</div>
                <div className="text-sm text-gray-400">Runtime: {item.show.movie.runtime} mins</div>
                <div className="text-sm text-gray-400 mt-1">Show: {new Date(item.show.showDateTime).toLocaleString()}</div>
                <div className="text-sm text-gray-400 mt-2">Seats: {Array.isArray(item.bookedSeats) ? item.bookedSeats.join(', ') : '—'}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatCurrency(item.amount ?? 0)}</div>
                <div className={`text-sm mt-1 ${item.isPaid ? 'text-green-400' : 'text-yellow-300'}`}>{item.isPaid ? 'Paid' : 'Pending'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings
